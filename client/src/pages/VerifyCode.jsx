import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function VerifyCode() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(600);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");

    if (savedEmail) {
      setEmail(savedEmail);
    }

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Code verified successfully");

        setTimeout(() => {
          navigate("/reset-password");
        }, 1500);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong");
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSeconds(600);
        setMessage("✅ New verification code sent");
        setErrorMessage("");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Failed to resend code");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-cyan-400 mb-4">
            Verify Code
          </h1>

          <p className="text-center text-slate-400 mb-6">
            Enter the verification code sent to your email.
          </p>

          {message && (
            <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-xl text-center mb-4">
              {message}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-xl text-center mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 text-center text-lg"
            />

            <div className="text-center">
              <p className="text-yellow-400 font-semibold">
                Code expires in: {minutes}:{remainingSeconds}
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Resend Code
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold text-white"
            >
              Verify Code
            </button>

          </form>

        </div>
      </section>
    </>
  );
}

export default VerifyCode;