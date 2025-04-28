import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

const GeocoderSearch = () => {
  const map = useMap();

  useEffect(() => {
    if (!map || typeof window === "undefined") return;

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
      collapsed: false,
      geocoder: L.Control.Geocoder.nominatim(),
      position: "topleft",
    });

    // Fit map bounds when a result is selected
    geocoder.on("markgeocode", function (e) {
      const bbox = e.geocode.bbox;
      const bounds = L.latLngBounds(bbox);
      map.fitBounds(bounds);
    });

    geocoder.addTo(map);

    const handleClickOutside = (e) => {
      const container = document.querySelector(".leaflet-control-geocoder");
      if (container && !container.contains(e.target)) {
        const resultList = container.querySelector(".leaflet-control-geocoder-alternatives");
        if (resultList) resultList.style.display = "none";
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      map.removeControl(geocoder);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [map]);

  return null;
};

export default GeocoderSearch;
