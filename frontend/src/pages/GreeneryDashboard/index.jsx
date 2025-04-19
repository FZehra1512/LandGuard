import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
  ScaleControl,
  Marker,
  Polygon,
} from "react-leaflet";
import MinimapControl from "@/components/GreeneryDashboardComponents/Minimap";
import PolygonLayer from "@/components/GreeneryDashboardComponents/PolygonLayer";
import GeocoderSearch from "@/components/GreeneryDashboardComponents/GeocoderSearch";
import AutocompleteSearch from "@/components/GreeneryDashboardComponents/AutocompleteSearch";

import L from "leaflet";
import "./greeneryDashboard.css";
import "leaflet/dist/leaflet.css";
import LocateButton from "@/components/GreeneryDashboardComponents/LocateButton";

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

const samplePolygons = [
    {
      name: "Taalib e Chaman Park, J Block",
      ndvi : 0.5,
      type: "Polygon",
      coordinates: [
        [24.959341, 67.050011],
        [24.957882, 67.048938],
        [24.957522, 67.050312],
        [24.958232, 67.051502],
        [24.959341, 67.050011],
      ],
    },
    {
      name: "Bin Qasim Park, Colony",
      ndvi : 0.7,
      type: "MultiPolygon",
      coordinates: [
        [24.814083, 67.024412],
        [24.809369, 67.020485],
        [24.805552, 67.026043],
        [24.809778, 67.028725],
        [24.811707, 67.028017],
        [24.814083, 67.024412],
      ],
    },
    {
      name: "Sakhi Hassan Graveyard",
      ndvi : 0.3,
      type: "MultiPolygon",
      coordinates: [
        [24.961491, 67.052908],
        [24.958087, 67.052822],
        [24.956054, 67.055708],
        [24.95795, 67.057747],
        [24.961491, 67.052908],
      ],
    },
];

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
      <ScaleControl position="topright" />
      <ZoomControl position="topright" />
      <GeocoderSearch />
      {/* <AutocompleteSearch /> */}



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

        <PolygonLayer polygons={samplePolygons} />
    </MapContainer>
  );
};

export default GreeneryDashboard;
