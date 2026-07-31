import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://geosense-ai-oxjd.vercel.app/api/auth/forgot-password",
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
        localStorage.setItem("resetEmail", email);

        setMessage("✅ Verification code sent successfully");

        setTimeout(() => {
          navigate("/verify-code");
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
            Forgot Password
          </h1>

          <p className="text-slate-400 text-center mb-6">
            Enter your registered email address to receive a verification code.
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
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold text-white"
            >
              Send Verification Code
            </button>

          </form>

        </div>
      </section>
    </>
  );
}

export default ForgotPassword;