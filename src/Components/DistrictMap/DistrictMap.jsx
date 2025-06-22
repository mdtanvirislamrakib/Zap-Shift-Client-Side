import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});



const FlyToDistrict = ({ coords }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 10); // Smooth fly to the district
  }
  return null;
};

const DistrictMap = ({districtData}) => {
  const [search, setSearch] = useState("");
  const [selectedCoords, setSelectedCoords] = useState(null);
  const markerRefs = useRef({});

  // Handle district search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Find matched district
    const match = districtData.find((d) =>
      d.district.toLowerCase().includes(value.toLowerCase())
    );

    if (match) {
      setSelectedCoords([match.latitude, match.longitude]);

      // Open popup after fly
      setTimeout(() => {
        const ref = markerRefs.current[match.district];
        if (ref) ref.openPopup();
      }, 500);
    }
  };

  return (
    <div className="my-8">
      {/* Search Box */}
      <div className="max-w-xl mx-auto mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search district..."
          className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Map */}
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Fly to selected district if matched */}
          {selectedCoords && <FlyToDistrict coords={selectedCoords} />}

          {/* All markers */}
          {districtData.map((d) => (
            <Marker
              key={d.district}
              position={[d.latitude, d.longitude]}
              ref={(ref) => (markerRefs.current[d.district] = ref)}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold text-lg">{d.district}</h3>
                  <p className="text-sm text-gray-600">
                    Covered: {d.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DistrictMap;
