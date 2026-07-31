import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("❌ Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage(
        "❌ Password must contain at least 8 characters"
      );
      return;
    }

    setSuccessMessage(
      "✅ Password changed successfully"
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
            Change Password
          </h1>

          {successMessage && (
            <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-xl text-center mb-4">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-xl text-center mb-4">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-cyan-400 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl font-semibold text-white"
            >
              Update Password
            </button>
          </form>

        </div>
      </section>
    </>
  );
}

export default ChangePassword;