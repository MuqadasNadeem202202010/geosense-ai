import { FaSatellite, FaGlobe, FaChartBar } from "react-icons/fa";
import { MdOutlineRadar } from "react-icons/md";

function Stats() {
  const stats = [
    {
      icon: <FaChartBar />,
      number: "500+",
      label: "Projects Completed",
    },
    {
      icon: <FaSatellite />,
      number: "10K+",
      label: "Satellite Images",
    },
    {
      icon: <MdOutlineRadar />,
      number: "50+",
      label: "Research Teams",
    },
    {
      icon: <FaGlobe />,
      number: "100+",
      label: "GIS Layers",
    },
  ];

  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Impact
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item) => (
            <div
              key={item.label}
              className="
              bg-slate-800
              rounded-2xl
              p-6
              text-center
              border
              border-slate-700
              hover:border-cyan-400
              hover:-translate-y-2
              transition-all
              duration-300
              "
            >
              <div className="text-5xl text-cyan-400 mb-4 flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold text-cyan-400">
                {item.number}
              </h3>

              <p className="mt-2 text-slate-300">
                {item.label}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;