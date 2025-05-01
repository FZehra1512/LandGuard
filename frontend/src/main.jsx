import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NdviProvider } from "@/hooks/use-ndvi";
import GoogleMapsProvider from "./providers/GoogleMapsProvider";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleMapsProvider>
      <NdviProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <AppRouter />
        </GoogleOAuthProvider>
      </NdviProvider>
    </GoogleMapsProvider>
  </StrictMode>
);
