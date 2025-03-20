import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
  ScaleControl,
  Marker,
} from "react-leaflet";
import MinimapControl from "@/components/GreeneryDashboardComponents/Minimap";
import L from "leaflet";
import "./greeneryDashboard.css";
import "leaflet/dist/leaflet.css";
import LocateButton from "@/components/GreeneryDashboardComponents/LocateButton";
// import Search from "react-leaflet-search";

const layerOptions = {
  esri: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const locateIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const GreeneryDashboard = () => {
  const [currentLayerUrl, setCurrentLayerUrl] = useState(layerOptions.esri);
  const [userLocation, setUserLocation] = useState(null);

  return (
    <MapContainer
      center={[24.8607, 67.0011]}
      zoom={12}
      zoomControl={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <ScaleControl
        position="topright"
        className="scale-control-custom-class"
      />
      <ZoomControl position="topright" />

      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="ESRI Satellite">
          <TileLayer
            url={layerOptions.esri}
            eventHandlers={{ add: () => setCurrentLayerUrl(layerOptions.esri) }}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Dark Mode">
          <TileLayer
            url={layerOptions.dark}
            eventHandlers={{ add: () => setCurrentLayerUrl(layerOptions.dark) }}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            url={layerOptions.osm}
            eventHandlers={{ add: () => setCurrentLayerUrl(layerOptions.osm) }}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <MinimapControl
        position="bottomright"
        zoom={10}
        currentLayerUrl={currentLayerUrl}
      />

      <LocateButton position="topright" setUserLocation={setUserLocation} />
      {userLocation && <Marker position={userLocation} icon={locateIcon} />}
      {/* <Search position="topright" /> */}
    </MapContainer>
  );
};

export default GreeneryDashboard;
