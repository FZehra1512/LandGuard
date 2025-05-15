import { useMap } from "react-leaflet";
import { LocateFixedIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { POSITION_CLASSES } from "@/components/GreeneryDashboardComponents/Minimap";

const LocateButton = ({ position, setUserLocation }) => {
  const map = useMap();

  const locateUser = () => {
    if (!navigator.geolocation) {
      toast({title: "Geolocation is not supported by your browser"});
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        map.flyTo([latitude, longitude], 15, {
          animate: true,
          duration: 1.5,
        });
      },
      () => {
        toast({title: "Unable to retrieve your location"});
      }
    );
  };
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  return (
    <div
      style={{
        position: "absolute",
        top: 300,
        right: 16,
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <Button variant="outline" size="icon" onClick={locateUser}>
        <LocateFixedIcon className="!w-6 !h-6" />
      </Button>
    </div>
  );
};

export default LocateButton;
