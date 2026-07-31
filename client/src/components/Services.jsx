import { FaSatellite, FaGlobe, FaRobot } from "react-icons/fa";
import { MdOutlineRadar } from "react-icons/md";

function Services() {
  const services = [
    {
      icon: <FaSatellite />,
      title: "Satellite Image Processing",
      desc: "Process and analyze high-resolution satellite imagery.",
    },
    {
      icon: <FaGlobe />,
      title: "GIS Mapping Solutions",
      desc: "Interactive mapping and spatial visualization services.",
    },
    {
      icon: <MdOutlineRadar />,
      title: "Remote Sensing Analysis",
      desc: "Advanced remote sensing workflows and monitoring.",
    },
    {
      icon: <FaRobot />,
      title: "AI Geospatial Insights",
      desc: "AI-powered geospatial intelligence and reporting.",
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

          {services.map((item) => (
            <div
              key={item.title}
              className="
              bg-slate-800/70
              backdrop-blur-md
              p-6
              rounded-2xl
              border
              border-slate-700
              hover:border-cyan-400
              hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
              hover:-translate-y-2
              transition-all
              duration-300
              "
            >
              <div className="text-5xl text-cyan-400 mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-cyan-400">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-300">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;