function About() {
  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About GeoSense AI
            </h2>

            <p className="text-slate-300 leading-8">
              GeoSense AI is a modern GIS and Remote Sensing platform
              designed for students, researchers, and professionals.
              The platform helps users visualize geographical data,
              analyze satellite imagery, and generate intelligent
              geospatial insights.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Why Choose Us?
            </h3>

            <ul className="space-y-4 text-slate-300">

              <li>✅ Interactive GIS Maps</li>

              <li>✅ Satellite Image Analysis</li>

              <li>✅ Remote Sensing Tools</li>

              <li>✅ Spatial Data Visualization</li>

              <li>✅ AI Driven Insights</li>

            </ul>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;