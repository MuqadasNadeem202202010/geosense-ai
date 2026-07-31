import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setName(savedUser.name || "");
    setUsername(savedUser.username || "");
    setEmail(savedUser.email || "");

    const savedAvatar = localStorage.getItem("avatar");

    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, [navigate]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
      localStorage.setItem("avatar", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    localStorage.removeItem("avatar");
    setAvatar("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");

    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">

          <h1 className="text-4xl font-bold text-center mb-10">
            My Profile
          </h1>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="flex flex-col items-center mb-8">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover border-2 border-cyan-500 mb-4"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-cyan-500 flex items-center justify-center text-4xl font-bold mb-4 text-slate-950">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
              )}

              <label className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl cursor-pointer font-semibold text-sm mt-2 text-slate-950 transition-colors">
                Upload Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>

              {avatar && (
                <button
                  onClick={handleRemoveAvatar}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-sm font-semibold mt-2 transition-colors"
                >
                  Remove Photo
                </button>
              )}

              <div className="mt-4 text-center">
                <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full font-semibold">
                  🌍 GIS Analyst
                </span>
              </div>
            </div>

            <div className="space-y-6">

              <div>
                <label className="text-slate-400 text-sm">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  readOnly
                  className="w-full mt-2 p-3 rounded-xl bg-slate-800 text-white border border-slate-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  readOnly
                  className="w-full mt-2 p-3 rounded-xl bg-slate-800 text-white border border-slate-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full mt-2 p-3 rounded-xl bg-slate-800 text-white border border-slate-700 cursor-not-allowed"
                />

                <div className="bg-slate-800 rounded-xl p-4 mt-6 border border-slate-700">
                  <h3 className="text-cyan-400 font-semibold mb-2">
                    GeoSense Rank
                  </h3>

                  <div className="w-full bg-slate-700 h-3 rounded-full">
                    <div className="bg-cyan-400 h-3 rounded-full w-[85%]" />
                  </div>

                  <p className="mt-2 text-cyan-400 font-medium">
                    Advanced GIS User • Level 8
                  </p>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm">
                  Account Status
                </label>

                <div className="mt-2">
                  <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                    🟢 Active
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  GIS Activity
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-1">🗺️</div>
                    <h4 className="text-cyan-400 text-2xl font-bold">
                      24
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Maps
                    </p>
                  </div>

                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-1">🚗</div>
                    <h4 className="text-cyan-400 text-2xl font-bold">
                      18
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Routes
                    </p>
                  </div>

                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-1">📂</div>
                    <h4 className="text-cyan-400 text-2xl font-bold">
                      8
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Uploads
                    </p>
                  </div>

                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-1">📊</div>
                    <h4 className="text-cyan-400 text-2xl font-bold">
                      12
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Exports
                    </p>
                  </div>

                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">

                <button
                  onClick={() => navigate("/change-password")}
                  className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-semibold text-slate-950 transition-colors"
                >
                  Change Password
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold text-white transition-colors"
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;