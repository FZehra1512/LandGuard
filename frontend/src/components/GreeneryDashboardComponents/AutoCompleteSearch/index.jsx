import { useState, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import debounce from "lodash.debounce";

const MAPBOX_TOKEN = "pk.eyJ1Ijoic2FuYW1hcnlhbTkwIiwiYSI6ImNsc29tMXA0ODBoYmoybW5zOXEzajY1cjIifQ.ZBghyl4WDQ9T7ZMcfhr7sQ";

const AutocompleteSearch = () => {
  const map = useMap();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const markerRef = useRef(null);

  const fetchSuggestions = debounce(async (searchText) => {
    if (!searchText) return;

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchText
      )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
    );
    const data = await res.json();
    setSuggestions(data.features);
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (feature) => {
    const [lng, lat] = feature.center;
    map.flyTo([lat, lng], 15, { duration: 1.5 });

    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(feature.place_name).openPopup();
    markerRef.current = marker;

    setSuggestions([]);
    setQuery(feature.place_name);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1000,
        width: "300px",
      }}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for places..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((feature) => (
            <li
              key={feature.id}
              onClick={() => handleSuggestionClick(feature)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {feature.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;
