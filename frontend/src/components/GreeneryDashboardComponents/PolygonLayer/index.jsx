import { Polygon, Popup } from "react-leaflet";
import PolygonPopup from "@/components/GreeneryDashboardComponents/PolygonPopup";


//values used are just for testing now, NOT FINALIZED YET
const getColorByNDVI = (ndvi) => {
  if (ndvi > 0.6) return "green"; // High vegetation
  if (ndvi > 0.3) return "yellow"; // Moderate vegetation
  return "red"; // Low vegetation
};

const PolygonLayer = ({ polygons }) => {
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
          >
            <Popup>
              {/* <div style={{
                padding: "8px",
                minWidth: "150px",
                textAlign: "center",
                fontFamily: "Arial, sans-serif"
              }}>
                <h3 style={{ margin: "0 0 5px", color: color }}>{polygon.name}</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>
                  NDVI: <span style={{ fontWeight: "bold", color }}>{polygon.ndvi}</span>
                </p>
              </div> */}
              <PolygonPopup polygon={polygon} color={color} />
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
};

export default PolygonLayer;
