function Features() {
  const features = [
    {
      icon: "🛰️",
      title: "Satellite Analysis",
      description:
        "Analyze Earth observation and satellite imagery with advanced tools.",
    },
    {
      icon: "🌍",
      title: "GIS Mapping",
      description:
        "Visualize and manage geospatial data using interactive maps.",
    },
    {
      icon: "📡",
      title: "Remote Sensing",
      description:
        "Process and interpret remote sensing datasets efficiently.",
    },
    {
      icon: "📊",
      title: "Spatial Analytics",
      description:
        "Generate meaningful insights from geographic information.",
    },
  ];

  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Platform Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
                hover:border-cyan-400
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="text-5xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-cyan-400">
                {feature.title}
              </h3>

              <p className="mt-3 text-slate-300">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;