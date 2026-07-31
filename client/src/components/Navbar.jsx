import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setUsername(savedUser.username || "");

    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");

    navigate("/login");
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-20">

          <Link
            to="/"
            className="text-2xl font-bold text-cyan-400"
          >
            GeoSense AI
          </Link>

          <ul className="hidden md:flex gap-8 items-center">
            <li>
              <Link to="/" className="hover:text-cyan-400">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-cyan-400">
                About
              </Link>
            </li>

            <li>
              <Link to="/services" className="hover:text-cyan-400">
                Services
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-cyan-400">
                Contact
              </Link>
            </li>

            <li>
              <Link to="/map" className="hover:text-cyan-400">
                Map
              </Link>
            </li>

            {token && (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-cyan-400">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/profile" className="hover:text-cyan-400">
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="hidden md:flex gap-3 items-center">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg text-slate-950 font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-slate-950">
                    {username ? username.charAt(0).toUpperCase() : "U"}
                  </div>
                )}

                <span className="text-cyan-400 font-semibold">
                  {username}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {menuOpen && (
          <div className="md:hidden pb-4">

            <ul className="flex flex-col gap-4 text-center">

              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  onClick={() => setMenuOpen(false)}
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/map"
                  onClick={() => setMenuOpen(false)}
                >
                  Map
                </Link>
              </li>

              {token && (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                </>
              )}

              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="bg-cyan-500 py-2 rounded-lg text-slate-950 font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="bg-slate-800 py-2 rounded-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 py-2 rounded-lg"
                >
                  Logout
                </button>
              )}

            </ul>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;