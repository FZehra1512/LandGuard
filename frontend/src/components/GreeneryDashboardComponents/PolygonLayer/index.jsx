import { useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import PolygonPopup from "@/components/GreeneryDashboardComponents/PolygonPopup";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import NDVIInfoCard from "../NDVIInfoCard";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileDrawer from "@/components/ui/mobile-drawer";

//TODO:values used are just for testing now, NOT FINALIZED YET
const getColorByNDVI = (ndvi) => {
  if (ndvi > 0.6) return "green"; // High vegetation
  if (ndvi > 0.3) return "yellow"; // Moderate vegetation
  return "red"; // Low vegetation
};

const PolygonLayer = ({ polygons }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState();
  const isMobile = useIsMobile();

  return (
    <>
      {polygons.map((polygon, index) => {
        const color = getColorByNDVI(polygon.ndvi);

        return (
          <Polygon
            key={index}
            positions={polygon.coordinates}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.5,
              color: color,
              opacity: 0.8,
              weight: 2,
            }}
            eventHandlers={{
              click: () => {
                setDialogOpen(true);
                setSelectedPolygon(polygon);
              },
            }}
          >
            {/* <Popup>
              <PolygonPopup polygon={polygon} color={color} />
            </Popup> */}
          </Polygon>
        );
      })}

      {isMobile ? (
        <MobileDrawer
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          showOverlay={false}
        >
          <NDVIInfoCard selectedPolygon={selectedPolygon} />
        </MobileDrawer>
      ) : (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen} modal={false}>
          <DialogContent
            aria-describedby={undefined}
            aria-labelledby={undefined}
            showOverlay={false}
            className="md:w-[40vw] lg:w-[30vw] h-[70%] pointer-events-auto left-6 translate-y-[-50%] md:ml-[20vw] lg:ml-[15vw]"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogTitle className="sr-only">Polygon Information</DialogTitle>
            <NDVIInfoCard selectedPolygon={selectedPolygon} />
          </DialogContent>
        </Dialog>
      )}
      
    </>
  );
};

export default PolygonLayer;
