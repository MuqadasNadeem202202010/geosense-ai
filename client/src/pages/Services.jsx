import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import servicesImage from "../assets/services-gis.png";

function Services() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Our Services
          </h1>

          <p className="text-slate-300 text-center max-w-3xl mx-auto mb-10 text-lg">
            We provide advanced GIS, Remote Sensing, Satellite Analysis
            and AI-powered Geospatial Intelligence services for research,
            monitoring and decision-making.
          </p>

          <div className="flex justify-center mb-16">
            <img
              src={servicesImage}
              alt="GIS Services"
              className="
              w-full
              max-w-2xl
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                🛰️
              </div>
              <h3 className="text-cyan-400 text-2xl font-bold mb-2">
                Satellite Analysis
              </h3>
              <p className="text-slate-300">
                Process and analyze multi-spectral satellite imagery for comprehensive spatial insights.
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
              <h3 className="text-cyan-400 text-2xl font-bold mb-2">
                GIS Mapping
              </h3>
              <p className="text-slate-300">
                Design and manage precise geographical information systems and interactive web maps.
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
                📡
              </div>
              <h3 className="text-cyan-400 text-2xl font-bold mb-2">
                Remote Sensing
              </h3>
              <p className="text-slate-300">
                Extract valuable environmental and terrain data from aerial and satellite observation.
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
                🤖
              </div>
              <h3 className="text-cyan-400 text-2xl font-bold mb-2">
                AI Analytics
              </h3>
              <p className="text-slate-300">
                Leverage cutting-edge AI models to automate geospatial pattern recognition and reports.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            How We Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300">
              <div className="text-6xl mb-4">
                🛰️
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                Collect Data
              </h3>
              <p className="text-slate-300">
                Gather satellite imagery and geospatial datasets.
              </p>
            </div>

            <div className="text-center bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300">
              <div className="text-6xl mb-4">
                📡
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                Analyze Data
              </h3>
              <p className="text-slate-300">
                Process GIS layers and remote sensing information.
              </p>
            </div>

            <div className="text-center bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300">
              <div className="text-6xl mb-4">
                📊
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                Generate Insights
              </h3>
              <p className="text-slate-300">
                Create reports and actionable geospatial intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready To Explore Geospatial Intelligence?
          </h2>
          <p className="text-slate-300 mb-8">
            Discover how our GIS, Remote Sensing and AI-powered
            solutions can help transform your data into insights.
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
            Get Started
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Services;