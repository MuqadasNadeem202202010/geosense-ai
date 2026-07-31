import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
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
  const [loginType, setLoginType] = useState("username");

  const [formData, setFormData] = useState({
    login: "",
    password: "",
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

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ Login Successful");

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
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

      <section className="min-h-[calc(100vh-80px)] bg-slate-950 flex items-center justify-center px-4 py-12">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-xl">

          <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
            Login
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

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-slate-300 mb-2 text-sm">
                Login with
              </label>

              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setLoginType("username")}
                  className={`px-4 py-2 rounded-lg ${
                    loginType === "username"
                      ? "bg-cyan-500 text-black"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  Username
                </button>

                <button
                  type="button"
                  onClick={() => setLoginType("email")}
                  className={`px-4 py-2 rounded-lg ${
                    loginType === "email"
                      ? "bg-cyan-500 text-black"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  Email
                </button>
              </div>

              <input
                type={loginType === "email" ? "email" : "text"}
                name="login"
                placeholder={
                  loginType === "email"
                    ? "Enter email"
                    : "Enter username"
                }
                value={formData.login}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2 text-sm">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-cyan-400 text-sm mt-2"
              >
                {showPassword
                  ? "Hide Password"
                  : "Show Password"}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-cyan-400 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold py-3 rounded-xl"
            >
              Login
            </button>

          </form>

          <p className="text-center text-slate-400 mt-6">
            Don't have an account?

            <Link
              to="/signup"
              className="text-cyan-400 ml-2 hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>
      </section>
    </>
  );
}

export default Login;