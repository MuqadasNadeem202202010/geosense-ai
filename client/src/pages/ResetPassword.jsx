import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("❌ Passwords do not match");
      return;
    }

    try {
      const email = localStorage.getItem("resetEmail");

      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password Updated Successfully");

        localStorage.removeItem("resetEmail");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
            Reset Password
          </h1>

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
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <p className="text-xs text-slate-400">
              Password must contain at least 8 characters, 1 number and 1 uppercase letter.
            </p>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold text-white"
            >
              Reset Password
            </button>

          </form>

        </div>
      </section>
    </>
  );
}

export default ResetPassword;