import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShapefileUpload from "../components/ShapefileUpload";
import html2canvas from "html2canvas";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  GeoJSON,
  ScaleControl,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ChangeMapView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);

  return null;
}

function ZoomToGeoJSON({ data }) {
  const map = useMap();

  useEffect(() => {
    if (!data) return;

    const layer = L.geoJSON(data);
    map.fitBounds(layer.getBounds());
  }, [data, map]);

  return null;
}

function ZoomToFeature({ feature }) {
  const map = useMap();

  useEffect(() => {
    if (!feature) return;

    const layer = L.geoJSON(feature);
    map.fitBounds(layer.getBounds());
  }, [feature, map]);

  return null;
}

function ZoomToRoute({ compareLocation1, compareLocation2 }) {
  const map = useMap();

  useEffect(() => {
    if (!compareLocation1 || !compareLocation2) return;

    const bounds = L.latLngBounds([compareLocation1, compareLocation2]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [compareLocation1, compareLocation2, map]);

  return null;
}

function MouseCoordinates({ setMouseCoords }) {
  const map = useMap();

  useEffect(() => {
    const handleMove = (e) => {
      setMouseCoords({
        lat: e.latlng.lat.toFixed(5),
        lng: e.latlng.lng.toFixed(5),
      });
    };

    map.on("mousemove", handleMove);

    return () => {
      map.off("mousemove", handleMove);
    };
  }, [map, setMouseCoords]);

  return null;
}

function ReverseGeocode({ setSelectedPlace }) {
  useMapEvents({
    click: async (e) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        );

        const data = await res.json();

        setSelectedPlace({
          name: data.display_name,
          lat: e.latlng.lat,
          lon: e.latlng.lng,
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return null;
}

function MapPage() {
  const [mapType, setMapType] = useState("street");
  const [mode, setMode] = useState("search");

  const [searchText, setSearchText] = useState("");

  const [position, setPosition] = useState([
    33.6844,
    73.0479,
  ]);

  const [searchedLocation, setSearchedLocation] =
    useState("");

  const [geoData, setGeoData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [copied, setCopied] = useState(false);
  const [layerKey, setLayerKey] = useState(0);
  const [tableData, setTableData] = useState([]);

  const [featureSearch, setFeatureSearch] = useState("");
  const [highlightedFeature, setHighlightedFeature] =
    useState(null);
  const [zoomFeature, setZoomFeature] = useState(null);
  const [mouseCoords, setMouseCoords] = useState(null);

  const [countryInfo, setCountryInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [distance, setDistance] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [loc1, setLoc1] = useState("");
  const [loc2, setLoc2] = useState("");
  const [compareLocation1, setCompareLocation1] = useState(null);
  const [compareLocation2, setCompareLocation2] = useState(null);
  const [compareDistance, setCompareDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const islamabad = {
    lat: 33.6844,
    lon: 73.0479,
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
  };

  const handleSearch = async () => {
    try {
      if (!searchText.trim()) {
        alert("Please enter a location");
        return;
      }

      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchText
        )}`
      );

      const geoData = await geoRes.json();

      if (!geoData.length) {
        alert("Location not found");
        return;
      }

      const lat = parseFloat(geoData[0].lat);
      const lon = parseFloat(geoData[0].lon);

      setPosition([lat, lon]);
      setSearchedLocation(geoData[0].display_name);

      const km = calculateDistance(
        islamabad.lat,
        islamabad.lon,
        lat,
        lon
      );

      setDistance(km);

      // Weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );

      const weatherData = await weatherRes.json();
      setWeatherInfo(weatherData.current_weather);

      // Country
      const country = geoData[0].display_name
        .split(",")
        .pop()
        .trim();

      const countryRes = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );

      const countryData = await countryRes.json();
      setCountryInfo(countryData[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const compareLocations = async () => {
    try {
      if (!loc1.trim() || !loc2.trim()) {
        alert("Please enter both locations to compare");
        return;
      }

      const r1 = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          loc1
        )}`
      );

      const r2 = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          loc2
        )}`
      );

      const d1 = await r1.json();
      const d2 = await r2.json();

      if (!d1.length || !d2.length) {
        alert("One or both comparison locations not found");
        return;
      }

      const p1 = [
        +d1[0].lat,
        +d1[0].lon,
      ];

      const p2 = [
        +d2[0].lat,
        +d2[0].lon,
      ];

      setCompareLocation1(p1);
      setCompareLocation2(p2);

      const routeRes = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${p1[1]},${p1[0]};${p2[1]},${p2[0]}?overview=full&geometries=geojson`
      );

      const routeData = await routeRes.json();

      if (!routeData.routes || routeData.routes.length === 0) {
        alert("Route could not be calculated");
        return;
      }

      setRouteCoords(
        routeData.routes[0].geometry.coordinates.map(
          (coord) => [coord[1], coord[0]]
        )
      );

      setCompareDistance(
        (
          routeData.routes[0].distance / 1000
        ).toFixed(2)
      );

      const totalSeconds = routeData.routes[0].duration;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      setTravelTime(`${hours} hr ${minutes} min`);
    } catch (err) {
      console.log(err);
    }
  };

  const downloadMapImage = async () => {
    const mapElement =
      document.querySelector(".leaflet-container");

    if (!mapElement) {
      alert("Map not found");
      return;
    }

    try {
      const canvas = await html2canvas(
        mapElement,
        {
          useCORS: true,
          allowTaint: true,
        }
      );

      const image =
        canvas.toDataURL("image/png");

      const link =
        document.createElement("a");

      link.href = image;

      const fileName =
        selectedFeature?.NAME ||
        selectedFeature?.PROVINCE ||
        selectedFeature?.DISTRICT ||
        selectedFeature?.name ||
        "Feature";

      link.download = `${fileName}.png`;

      link.click();
    } catch (error) {
      console.error(error);
      alert("Failed to download map");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-4xl font-bold text-center mb-3">
            Interactive Map
          </h1>

          <p className="text-center text-slate-400 mb-6">
            Search any location in the world
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
            <div className="flex gap-8">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === "search"}
                  onChange={() => setMode("search")}
                  className="accent-cyan-500"
                />
                Search Location
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === "shapefile"}
                  onChange={() => setMode("shapefile")}
                  className="accent-cyan-500"
                />
                Shapefile Upload
              </label>

            </div>
          </div>

          {mode === "search" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

              <h2 className="text-xl font-semibold mb-4">
                Search Location
              </h2>

              <input
                type="text"
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search location..."
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
              />

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleSearch}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Search Location
                </button>

                <button
                  onClick={() => {
                    setSearchText("");
                    setSearchedLocation("");
                    setPosition([33.6844, 73.0479]);
                    setCountryInfo(null);
                    setWeatherInfo(null);
                    setDistance(null);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Clear Search
                </button>
              </div>

              {searchedLocation && (
                <div className="mt-5 bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <h3 className="text-cyan-400 font-semibold mb-2">
                    Selected Location
                  </h3>

                  <p className="text-slate-300">
                    {searchedLocation}
                  </p>
                </div>
              )}

              {searchedLocation && (
                <div className="mt-3 text-slate-400 text-sm space-y-1">
                  <p>Latitude: {position[0]}</p>
                  <p>Longitude: {position[1]}</p>
                </div>
              )}

              {searchedLocation && (
                <div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${position[0]}, ${position[1]}`
                      );

                      setCopied(true);

                      setTimeout(() => {
                        setCopied(false);
                      }, 3000);
                    }}
                    className="mt-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-5 py-2 rounded-xl transition-colors"
                  >
                    Copy Coordinates
                  </button>

                  <a
                    href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 inline-block mt-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-5 py-2 rounded-xl transition-colors"
                  >
                    Open In Google Maps
                  </a>

                  {copied && (
                    <p className="text-green-400 mt-2">
                      Coordinates Copied ✅
                    </p>
                  )}
                </div>
              )}

              {distance && (
                <div className="mt-4 bg-slate-800 p-4 rounded-xl">
                  <h3 className="text-cyan-400 font-semibold">
                    Distance From Islamabad
                  </h3>
                  <p className="text-xl font-bold">
                    {distance} km
                  </p>
                </div>
              )}

              {countryInfo && (
                <div className="mt-4 bg-slate-800 p-5 rounded-xl">
                  {countryInfo.flags?.png && (
                    <img
                      src={countryInfo.flags.png}
                      alt=""
                      className="w-20 mb-3 rounded"
                    />
                  )}

                  <h3 className="text-cyan-400 font-bold text-lg mb-2">
                    {countryInfo.name?.common}
                  </h3>

                  <p className="text-slate-300">
                    <span className="font-semibold text-white">Capital: </span>
                    {countryInfo.capital?.[0]}
                  </p>

                  <p className="text-slate-300">
                    <span className="font-semibold text-white">Region: </span>
                    {countryInfo.region}
                  </p>

                  <p className="text-slate-300">
                    <span className="font-semibold text-white">Population: </span>
                    {countryInfo.population?.toLocaleString()}
                  </p>

                  <p className="text-slate-300">
                    <span className="font-semibold text-white">Currency: </span>
                    {
                      Object.values(
                        countryInfo.currencies || {}
                      )[0]?.name
                    }
                  </p>
                </div>
              )}

              {weatherInfo && (
                <div className="mt-4 bg-slate-800 p-5 rounded-xl">
                  <h3 className="text-cyan-400 font-bold mb-2">
                    Current Weather
                  </h3>

                  <p className="text-slate-300">
                    🌡 {weatherInfo.temperature} °C
                  </p>

                  <p className="text-slate-300">
                    🌬 {weatherInfo.windspeed} km/h
                  </p>

                  <p className="text-slate-300">
                    Weather Code: {weatherInfo.weathercode}
                  </p>
                </div>
              )}

            </div>
          )}

          {mode === "shapefile" && (
            <ShapefileUpload
              setGeoData={(data) => {
                setGeoData(data);
                setSelectedFeature(null);
                setHighlightedFeature(null);
                setZoomFeature(null);
                setLayerKey((prev) => prev + 1);

                const features = data?.features
                  ? data.features
                  : Array.isArray(data)
                  ? data[0]?.features || []
                  : [];

                setTableData(features);
              }}
              clearMapData={() => {
                setGeoData(null);
                setSelectedFeature(null);
                setHighlightedFeature(null);
                setZoomFeature(null);
                setTableData([]);
                setLayerKey((prev) => prev + 1);
              }}
            />
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">
              Compare Two Locations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={loc1}
                onChange={(e) => setLoc1(e.target.value)}
                placeholder="Enter First Location"
                className="p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
              />

              <input
                type="text"
                value={loc2}
                onChange={(e) => setLoc2(e.target.value)}
                placeholder="Enter Second Location"
                className="p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={compareLocations}
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Compare Distance
              </button>

              <button
                onClick={() => {
                  setCompareLocation1(null);
                  setCompareLocation2(null);
                  setCompareDistance(null);
                  setTravelTime(null);
                  setRouteCoords([]);
                  setLoc1("");
                  setLoc2("");
                }}
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-xl font-semibold"
              >
                Clear Route
              </button>
            </div>

            {compareDistance && (
              <div className="mt-4 bg-slate-800 p-5 rounded-xl">
                <h3 className="text-cyan-400 font-semibold mb-3">
                  Comparison Result
                </h3>

                <div className="space-y-2">
                  <p>
                    <span className="font-bold">
                      From:
                    </span>{" "}
                    {loc1}
                  </p>

                  <p>
                    <span className="font-bold">
                      To:
                    </span>{" "}
                    {loc2}
                  </p>

                  <p>
                    🚗 Distance:{" "}
                    {compareDistance} km
                  </p>

                  <p>
                    ⏱ Travel Time:{" "}
                    {travelTime}
                  </p>

                  <p className="text-green-400">
                    Route Found ✅
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-6">

            <button
              onClick={() => setMapType("street")}
              className={`px-5 py-2 rounded-xl font-medium transition-colors ${
                mapType === "street"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              Street Map
            </button>

            <button
              onClick={() => setMapType("satellite")}
              className={`px-5 py-2 rounded-xl font-medium transition-colors ${
                mapType === "satellite"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              Satellite Map
            </button>

            <button
              onClick={() => setMapType("topographic")}
              className={`px-5 py-2 rounded-xl font-medium transition-colors ${
                mapType === "topographic"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              Topographic
            </button>

            <button
              onClick={() => setMapType("dark")}
              className={`px-5 py-2 rounded-xl font-medium transition-colors ${
                mapType === "dark"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              Dark Map
            </button>

            <button
              onClick={() => setMapType("terrain")}
              className={`px-5 py-2 rounded-xl font-medium transition-colors ${
                mapType === "terrain"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              Terrain
            </button>

            <button
              onClick={() => {
                setSearchText("");
                setSearchedLocation("");
                setPosition([33.6844, 73.0479]);
                setGeoData(null);
                setSelectedFeature(null);
                setHighlightedFeature(null);
                setZoomFeature(null);
                setTableData([]);
                setCountryInfo(null);
                setWeatherInfo(null);
                setDistance(null);
                setSelectedPlace(null);
                setCompareLocation1(null);
                setCompareLocation2(null);
                setCompareDistance(null);
                setTravelTime(null);
                setRouteCoords([]);
                setLoc1("");
                setLoc2("");
              }}
              className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-semibold transition-colors"
            >
              Reset Map
            </button>

            <button
              onClick={() => {
                setPosition([33.6844, 73.0479]);
                setZoomFeature(null);
                setHighlightedFeature(null);
              }}
              className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold"
            >
              Home Extent
            </button>

            <button
              onClick={downloadMapImage}
              className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
            >
              Download Map
            </button>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`overflow-hidden rounded-3xl border border-slate-800 ${mode === "shapefile" ? "lg:col-span-2" : "lg:col-span-3"}`}>

              <MapContainer
                center={position}
                zoom={16}
                style={{
                  height: "600px",
                  width: "100%",
                }}
              >
                <ChangeMapView center={position} />
                <ScaleControl position="bottomleft" />
                <ReverseGeocode setSelectedPlace={setSelectedPlace} />

                {zoomFeature && (
                  <ZoomToFeature feature={zoomFeature} />
                )}

                <ZoomToRoute
                  compareLocation1={compareLocation1}
                  compareLocation2={compareLocation2}
                />

                <MouseCoordinates
                  setMouseCoords={setMouseCoords}
                />

                {mapType === "street" && (
                  <TileLayer
                    attribution="© OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                )}

                {mapType === "satellite" && (
                  <TileLayer
                    attribution="Esri"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                )}

                {mapType === "topographic" && (
                  <TileLayer
                    attribution="OpenTopoMap"
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                  />
                )}

                {mapType === "dark" && (
                  <TileLayer
                    attribution="Carto"
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                )}

                {mapType === "terrain" && (
                  <TileLayer
                    attribution="Esri"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"
                  />
                )}

                {searchedLocation && (
                  <Marker position={position}>
                    <Popup>
                      <strong>{searchedLocation}</strong>
                    </Popup>
                  </Marker>
                )}

                {searchedLocation && (
                  <Circle
                    center={position}
                    radius={100}
                    pathOptions={{
                      color: "red",
                      fillColor: "red",
                      fillOpacity: 0.3,
                    }}
                  />
                )}

                {compareLocation1 && (
                  <Marker position={compareLocation1}>
                    <Popup>
                      🟢 Start Location
                      <br />
                      {loc1}
                    </Popup>
                  </Marker>
                )}

                {compareLocation2 && (
                  <Marker position={compareLocation2}>
                    <Popup>
                      🔴 Destination
                      <br />
                      {loc2}
                    </Popup>
                  </Marker>
                )}

                {routeCoords.length > 0 && (
                  <Polyline
                    positions={routeCoords}
                    pathOptions={{
                      color: "#ef4444",
                      weight: 10,
                      opacity: 0.9,
                      lineCap: "round",
                      lineJoin: "round",
                    }}
                  />
                )}

                {geoData && (
                  <>
                    <ZoomToGeoJSON data={geoData} />

                    <GeoJSON
                      key={layerKey}
                      data={geoData}
                      style={{
                        color: "#06b6d4",
                        weight: 2,
                        fillColor: "#06b6d4",
                        fillOpacity: 0.3,
                      }}
                      pointToLayer={(feature, latlng) =>
                        L.circleMarker(latlng, {
                          radius: 8,
                          fillColor: "#06b6d4",
                          color: "#ffffff",
                          weight: 1,
                          fillOpacity: 1,
                        })
                      }
                      onEachFeature={(feature, layer) => {
                        layer.on("click", () => {
                          setSelectedFeature(feature.properties);
                          setHighlightedFeature(feature);
                          setZoomFeature(feature);
                        });
                      }}
                    />

                    {highlightedFeature && (
                      <GeoJSON
                        data={highlightedFeature}
                        style={{
                          color: "red",
                          weight: 4,
                          fillColor: "red",
                          fillOpacity: 0.2,
                        }}
                      />
                    )}
                  </>
                )}
              </MapContainer>

            </div>

            {mode === "shapefile" && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col max-h-[600px] overflow-y-auto">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                    {selectedFeature?.name ||
                      selectedFeature?.NAME ||
                      selectedFeature?.Name ||
                      "Selected Feature Information"}
                  </h3>

                  {selectedFeature ? (
                    <div className="space-y-3 text-slate-300">
                      {Object.entries(selectedFeature)
                        .filter(
                          ([key, value]) =>
                            value !== null &&
                            value !== "" &&
                            !key.toLowerCase().includes("wiki") &&
                            !key.toLowerCase().includes("ne_id") &&
                            !key.toLowerCase().includes("wdid") &&
                            !key.toLowerCase().includes("comments") &&
                            !key.toLowerCase().startsWith("name_")
                        )
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="border-b border-slate-800 pb-2"
                          >
                            <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold">
                              {key.replaceAll("_", " ")}
                            </span>

                            <span className="text-white font-medium break-words">
                              {String(value)}
                            </span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">
                      Click on any feature on the map to view its properties here.
                    </p>
                  )}
                </div>

                {selectedFeature && (
                  <button
                    onClick={() => {
                      setSelectedFeature(null);
                      setHighlightedFeature(null);
                      setZoomFeature(null);
                    }}
                    className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Clear Selection
                  </button>
                )}
              </div>
            )}
          </div>

          {routeCoords.length > 0 && (
            <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-cyan-400 font-bold text-lg mb-3">
                Route Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-slate-400">Start</p>
                  <p className="font-bold">{loc1}</p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-slate-400">Destination</p>
                  <p className="font-bold">{loc2}</p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-slate-400">Distance</p>
                  <p className="font-bold">{compareDistance} km</p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-slate-400">
                    Travel Time
                  </p>
                  <p className="font-bold">
                    {travelTime}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedPlace && (
            <div className="mt-6 bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-cyan-400 font-semibold text-lg mb-2">
                Selected Place (Clicked on Map)
              </h3>
              <p className="text-slate-300 mb-2">{selectedPlace.name}</p>
              <p className="text-slate-400 text-sm">
                Lat: {selectedPlace.lat.toFixed(5)}
              </p>
              <p className="text-slate-400 text-sm">
                Lon: {selectedPlace.lon.toFixed(5)}
              </p>
            </div>
          )}

          {mouseCoords && (
            <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">
                Live Coordinates
              </h3>

              <p>Latitude: {mouseCoords.lat}</p>

              <p>Longitude: {mouseCoords.lng}</p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}

export default MapPage;