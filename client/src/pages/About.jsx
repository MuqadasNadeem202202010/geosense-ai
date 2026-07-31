import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import aboutImage from "../assets/about-gis.png";

function About() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About
                <span className="block text-cyan-400">GeoSense AI</span>
                <span className="text-lg md:text-xl text-slate-400 block mt-4">
                  Transforming Geospatial Intelligence Through AI
                </span>
              </h1>
              <p className="text-slate-300 leading-8 text-lg">
                GeoSense AI is an advanced GIS and Remote Sensing platform
                designed to provide powerful geospatial intelligence tools
                for students, researchers and professionals.
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src={aboutImage}
                alt="GIS Dashboard and Spatial Analytics"
                className="
                w-full
                max-w-xl
                rounded-3xl
                border
                border-cyan-500/20
                shadow-[0_0_50px_rgba(34,211,238,0.3)]
                hover:scale-105
                transition-all
                duration-300
                "
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="
            bg-slate-800/70
            backdrop-blur-md
            p-8
            rounded-3xl
            border
            border-slate-700
            hover:border-cyan-400
            hover:-translate-y-2
            transition-all
            duration-300
            ">
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                🚀 Our Mission
              </h2>
              <p className="text-slate-300 leading-relaxed">
                To empower geospatial professionals with modern GIS and
                Remote Sensing technologies.
              </p>
            </div>

            <div className="
            bg-slate-800/70
            backdrop-blur-md
            p-8
            rounded-3xl
            border
            border-slate-700
            hover:border-cyan-400
            hover:-translate-y-2
            transition-all
            duration-300
            ">
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                🌍 Our Vision
              </h2>
              <p className="text-slate-300 leading-relaxed">
                To become a leading platform for AI-powered geospatial
                intelligence and Earth observation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="
            bg-slate-900
            p-6
            rounded-2xl
            border
            border-slate-800
            hover:border-cyan-400
            hover:-translate-y-2
            hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
            transition-all
            duration-300
            ">
              <div className="text-5xl mb-4">
                🎯
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                Innovation
              </h3>
              <p className="text-slate-300">
                Building intelligent geospatial solutions.
              </p>
            </div>

            <div className="
            bg-slate-900
            p-6
            rounded-2xl
            border
            border-slate-800
            hover:border-cyan-400
            hover:-translate-y-2
            hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
            transition-all
            duration-300
            ">
              <div className="text-5xl mb-4">
                🌍
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                Sustainability
              </h3>
              <p className="text-slate-300">
                Supporting Earth observation and environmental monitoring.
              </p>
            </div>

            <div className="
            bg-slate-900
            p-6
            rounded-2xl
            border
            border-slate-800
            hover:border-cyan-400
            hover:-translate-y-2
            hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
            transition-all
            duration-300
            ">
              <div className="text-5xl mb-4">
                🤝
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                Collaboration
              </h3>
              <p className="text-slate-300">
                Connecting students, researchers and professionals.
              </p>
            </div>

            <div className="
            bg-slate-900
            p-6
            rounded-2xl
            border
            border-slate-800
            hover:border-cyan-400
            hover:-translate-y-2
            hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
            transition-all
            duration-300
            ">
              <div className="text-5xl mb-4">
                📊
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                Data Excellence
              </h3>
              <p className="text-slate-300">
                Delivering accurate geospatial insights and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;