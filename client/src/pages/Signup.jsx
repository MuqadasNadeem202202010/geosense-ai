import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!usernameRegex.test(formData.username)) {
      setErrorMessage(
        "❌ Username can contain only letters, numbers and underscore (_)"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("❌ Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ Account Created Successfully");

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setTimeout(() => {
          navigate("/dashboard");
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
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Create Account
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
              />
            </div>

            <div>
              <input
                type="text"
                name="username"
                placeholder="Choose a Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
              />

              <p className="text-xs text-slate-400 mt-1">
                Username may contain letters, numbers and underscores only.
              </p>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />

            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Your Own Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-cyan-400 text-sm mt-2"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>

              <p className="text-xs text-slate-400 mt-1">
                Password must contain at least 8 characters, 1 number and 1 uppercase letter.
              </p>
            </div>

            <div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="text-cyan-400 text-sm mt-2"
              >
                {showConfirmPassword
                  ? "Hide Confirm Password"
                  : "Show Confirm Password"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold text-white"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-slate-400 mt-6">
            Already have an account?

            <Link
              to="/login"
              className="text-cyan-400 ml-2"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Signup;