import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Services from "../components/Services";
import About from "../components/About";
import Footer from "../components/Footer";
import heroImage from "../assets/hero-gis.png";

function Home() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                GeoSense AI
                <span className="block text-cyan-400">
                  GIS & Remote Sensing
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-8">
                GeoSense AI empowers researchers, students, and professionals
                to analyze satellite imagery, visualize geographic information,
                perform remote sensing operations, and generate intelligent
                geospatial insights.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/signup"
                  className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold transition"
                >
                  Get Started
                </Link>

                <button className="border border-white hover:bg-white hover:text-slate-950 px-8 py-3 rounded-lg transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="flex justify-center">
              <img
                src={heroImage}
                alt="GIS Remote Sensing"
                className="
                  w-full
                  max-w-xl
                  drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]
                  hover:scale-105
                  transition-all
                  duration-500
                "
              />
            </div>

          </div>
        </div>
      </section>

      <Features />
      <Stats />
      <Services />
      <About />
      <Footer />
    </>
  );
}

export default Home;