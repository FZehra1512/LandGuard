// src/providers/GoogleMapsProvider.jsx
import AppLoader from "@/components/ui/app-loader";
import { LoadScript } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const LIBRARIES = ["places"];

const GoogleMapsProvider = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={LIBRARIES}
      loadingElement={
        <div className="w-screen h-screen flex items-center justify-center bg-white">
          <AppLoader />
        </div>
      }
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
