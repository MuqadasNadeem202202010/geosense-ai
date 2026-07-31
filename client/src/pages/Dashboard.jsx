import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const tools = [
    {
      icon: "🗺️",
      title: "Interactive Map",
      description: "Explore geospatial data using interactive mapping tools.",
    },
    {
      icon: "🛰️",
      title: "Satellite Layer",
      description: "View satellite imagery and Earth observation datasets.",
    },
    {
      icon: "📂",
      title: "Shapefile Upload",
      description: "Upload and manage shapefiles for GIS analysis.",
    },
    {
      icon: "📊",
      title: "Analysis Requests",
      description: "Submit geospatial analysis tasks and view results.",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Dashboard
          </h1>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-white font-semibold transition-colors"
            >
              Logout
            </button>
          </div>

          <p className="text-center text-slate-300 max-w-3xl mx-auto mb-12">
            Access powerful GIS, Remote Sensing and AI-driven tools from one place.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4">
              Welcome to GeoSense AI
            </h2>

            <p className="text-slate-300">
              Manage GIS projects, analyze satellite imagery,
              upload shapefiles and monitor geospatial insights
              from one centralized dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

            {/* Card 1 -> Geo Intelligence Core */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 hover:scale-105 hover:-translate-y-2 duration-300 shadow-cyan-500/20 hover:shadow-xl transition">
              <div className="text-5xl mb-4">
                🌍
              </div>

              <h3 className="text-cyan-400 text-2xl font-bold mb-3">
                Geo Intelligence Core
              </h3>

              <div className="space-y-2 text-slate-300">
                <p>Location Search </p>
                <p>Routing Engine </p>
                <p>Spatial Analysis </p>
                <p>Weather Service </p>
              </div>

              <div className="mt-4">
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-cyan-400 h-3 rounded-full w-[98%]" />
                </div>

                <p className="mt-2 text-cyan-400 font-bold">
                  Geo Score: 98%
                </p>
              </div>
            </div>

            {/* Card 2 -> Mission Control */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 hover:scale-105 hover:-translate-y-2 duration-300 shadow-cyan-500/20 hover:shadow-xl transition">
              <div className="text-5xl mb-4">
                🚀
              </div>

              <h3 className="text-purple-400 text-2xl font-bold mb-3">
                Mission Control
              </h3>

              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Mapping</span>
                  <span className="text-green-400">
                    ACTIVE
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Routing</span>
                  <span className="text-green-400">
                    ACTIVE
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Geo Processing</span>
                  <span className="text-green-400">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 -> GeoSense Command Center */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-green-500/30 rounded-2xl p-6 hover:scale-105 hover:-translate-y-2 duration-300 shadow-cyan-500/20 hover:shadow-xl transition">
              <div className="text-5xl mb-4">
                🛰️
              </div>

              <h3 className="text-green-400 text-2xl font-bold mb-3">
                Command Center
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-4 text-slate-300">
                <div className="bg-slate-800 rounded-xl p-3 text-center">
                  🗺
                  <p>Map</p>
                </div>

                <div className="bg-slate-800 rounded-xl p-3 text-center">
                  📂
                  <p>Layers</p>
                </div>

                <div className="bg-slate-800 rounded-xl p-3 text-center">
                  🌦
                  <p>Weather</p>
                </div>

                <div className="bg-slate-800 rounded-xl p-3 text-center">
                  🚗
                  <p>Routes</p>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            <div className="bg-slate-900 p-6 rounded-2xl text-center border border-slate-800">
              <h3 className="text-4xl text-cyan-400 font-bold mb-2">12</h3>
              <p className="text-slate-300">Projects</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl text-center border border-slate-800">
              <h3 className="text-4xl text-cyan-400 font-bold mb-2">24</h3>
              <p className="text-slate-300">Maps</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl text-center border border-slate-800">
              <h3 className="text-4xl text-cyan-400 font-bold mb-2">8</h3>
              <p className="text-slate-300">Uploads</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl text-center border border-slate-800">
              <h3 className="text-4xl text-cyan-400 font-bold mb-2">31</h3>
              <p className="text-slate-300">Reports</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-12">

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              GeoSense AI Platform Overview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-slate-300 font-medium">

              <div>🗺 GIS Mapping</div>
              <div>🛰 Remote Sensing</div>
              <div>📂 Shapefile Analysis</div>
              <div>📍 Location Intelligence</div>
              <div>🚗 Route Planning</div>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-cyan-400 transition-all duration-300"
              >
                <div className="text-5xl mb-4">
                  {tool.icon}
                </div>

                <h3 className="text-xl font-bold text-cyan-400 mb-3">
                  {tool.title}
                </h3>

                <p className="text-slate-300">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-cyan-400 text-2xl font-bold mb-5">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <button
                onClick={() => navigate("/map")}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-xl transition-colors"
              >
                Open Map
              </button>

              <button
                onClick={() => navigate("/services")}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Services
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Contact
              </button>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Dashboard;