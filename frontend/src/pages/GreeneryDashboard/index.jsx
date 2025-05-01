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
import PolygonLayer from "@/components/GreeneryDashboardComponents/PolygonLayer";
import GeocoderSearch from "@/components/GreeneryDashboardComponents/GeocoderSearch";
import { useNdvi } from "@/hooks/use-ndvi";

import L from "leaflet";
import "./greeneryDashboard.css";
import "leaflet/dist/leaflet.css";
import LocateButton from "@/components/GreeneryDashboardComponents/LocateButton";
import { useViewportHeight } from "@/hooks/use-viewport-height";
import { Loader2 } from "lucide-react";
import SearchBox from "@/components/GreeneryDashboardComponents/GeocoderSearch";

const layerOptions = {
  esri: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

export const locateIcon = new L.Icon({
  iconUrl: "/map_marker.png",
  iconSize: [29, 45],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const GreeneryDashboard = () => {
  const [currentLayerUrl, setCurrentLayerUrl] = useState(layerOptions.esri);
  const [userLocation, setUserLocation] = useState(null);
  const { ndviPolygons, loading } = useNdvi();
  const vh = useViewportHeight();

  return (
    <MapContainer
      center={[24.93167048902523, 67.11313160770239]}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={false}
      touchZoom={true}
      style={{ height: `calc(${vh * 100}px)`, width: "100%" }}
    >
      {loading && (
        <div className="absolute inset-0 bg-black/50 z-[2000] flex items-center justify-center rounded-[10px]">
          <Loader2 className="animate-spin w-10 h-10 text-accent" />
        </div>
      )}
      <ZoomControl position="topright" />
      <ScaleControl position="topright" />
      <SearchBox setSearchLocation={setUserLocation}/>

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

      <PolygonLayer polygons={ndviPolygons} />
    </MapContainer>
  );
};

export default GreeneryDashboard;
