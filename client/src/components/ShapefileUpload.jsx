import { useState, useRef } from "react";
import shp from "shpjs";

function ShapefileUpload({
  setGeoData,
  clearMapData
}) {
  const [zipFile, setZipFile] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [featureCount, setFeatureCount] = useState(null);
  const [geometryType, setGeometryType] = useState("");
  const zipRef = useRef(null);

  const handleClear = () => {
    setZipFile(null);
    setLoaded(false);

    if (zipRef.current)
      zipRef.current.value = "";

    setGeoData(null);

    if (clearMapData) {
      clearMapData();
    }
  };

  const handleLoad = async () => {
    try {
      if (!zipFile) {
        alert("Please select a ZIP shapefile archive");
        return;
      }

      const arrayBuffer = await zipFile.arrayBuffer();

      const data = await shp(arrayBuffer);

      console.log("GeoJSON Data:", data);

      let features = [];

      if (data?.features) {
        features = data.features;
      } else if (Array.isArray(data)) {
        features = data[0]?.features || [];
      }

      setFeatureCount(features.length);

      setGeometryType(
        features[0]?.geometry?.type || "Unknown"
      );

      console.log("Features Count:", features.length);
      console.log(
        "Geometry:",
        features[0]?.geometry?.type
      );

      console.log(
        "FIRST FEATURE:",
        features[0]?.properties
      );

      setGeoData(null);

      setTimeout(() => {
        setGeoData(data);
      }, 50);

      setLoaded(true);
    } catch (error) {
      console.log(error);
      alert("Invalid shapefile archive");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

      <h2 className="text-xl font-semibold mb-2">
        Upload Shapefile
      </h2>

      <p className="text-slate-400 mb-5">
        Upload a ZIP shapefile archive containing all required files for geospatial visualization and analysis.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-5">
        <p className="text-cyan-400 font-semibold mb-2">
          Required Files Inside ZIP
        </p>

        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>.shp (Main Shape File)</li>
          <li>.dbf (Attribute Data)</li>
          <li>.shx (Shape Index)</li>
          <li>.prj (Projection Information)</li>
        </ul>

        <p className="mt-2 text-slate-400 text-sm">
          Archive must contain .shp, .dbf, .shx and .prj files.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            ZIP Shapefile Archive
          </label>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={zipFile ? zipFile.name : ""}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <button
              type="button"
              onClick={() => zipRef.current.click()}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-4 py-3 rounded-xl transition-colors"
            >
              ...
            </button>

            <input
              type="file"
              accept=".zip"
              ref={zipRef}
              onChange={(e) => {
                setZipFile(e.target.files[0]);
                setLoaded(false);
              }}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={handleLoad}
          className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Load Shapefile
        </button>

        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Clear
        </button>

      </div>

      <div className="mt-4">
        {!zipFile && (
          <p className="text-slate-400">
            Status: No Shapefile Loaded
          </p>
        )}

        {loaded && zipFile && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <h3 className="text-cyan-400 font-semibold mb-3">
              Shapefile Information
            </h3>

            <p className="text-slate-300 mb-1">
              <strong>File Name:</strong> {zipFile.name}
            </p>

            <p className="text-green-400 mb-1 font-medium">
              <strong>Status:</strong> Loaded Successfully ✅
            </p>

            <p className="text-slate-300 mb-1">
              <strong>Archive Type:</strong> ZIP Archive
            </p>

            <p className="text-slate-300 mb-1">
              <strong>Geometry Type:</strong> {geometryType}
            </p>

            <p className="text-slate-300">
              <strong>Features:</strong> {featureCount}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default ShapefileUpload;