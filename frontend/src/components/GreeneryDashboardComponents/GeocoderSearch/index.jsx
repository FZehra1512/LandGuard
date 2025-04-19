import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

const GeocoderSearch = () => {
  const map = useMap();

  useEffect(() => {
    if (!map || typeof window === "undefined") return;

    // const geocoder = L.Control.geocoder({
    //   defaultMarkGeocode: true,
    //   collapsed: false,
    //   position: "topleft", // You can change this if needed
    // });
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
      collapsed: false,
      geocoder: L.Control.Geocoder.nominatim(),
      position: "topleft"
    });
    

    geocoder.on("markgeocode", function (e) {
      const bbox = e.geocode.bbox;
      const bounds = L.latLngBounds(bbox);
      map.fitBounds(bounds);
    });

    // geocoder.on("markgeocode", function (e) {
    //   const center = e.geocode.center;
    //   map.setView(center, 18); 
    // });

    // geocoder.on("markgeocode", function (e) {
    //   const center = e.geocode.center;
    //   map.flyTo(center, 22, {
    //     animate: true,
    //     duration: 1.5
    //   });
    
    //   L.marker(center).addTo(map)
    //     .bindPopup(e.geocode.name)
    //     .openPopup();
    // });
    
    

    geocoder.addTo(map);

    return () => {
      map.removeControl(geocoder);
    };
  }, [map]);

  return null;
};

export default GeocoderSearch;
