import { createContext, useContext, useState, useEffect } from "react";
import { getNDVIData } from "@/api/mapDataEndpoints";

// context
const NdviContext = createContext();

// the provider
export const NdviProvider = ({ children }) => {
  const [ndviPolygons, setNdviPolygons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the data once
  useEffect(() => {
    const fetchNDVI = async () => {
      const { code, data } = await getNDVIData();
      if (code === 200) {
        if (code === 200 && data?.length) {
          const formatted = data.map((item) => ({
            name: item.place_name,
            ndvi: Number(item.ndvi_stats.mean.toFixed(3)),
            type: "Polygon",
            coordinates: item.coordinates[0],
          }));
          setNdviPolygons(formatted);
        }
      } else {
        console.error("Failed to fetch NDVI:", data);
      }
      setLoading(false);
    };

    fetchNDVI();
  }, []);

  return (
    <NdviContext.Provider value={{ ndviPolygons, setNdviPolygons, loading }}>
      {children}
    </NdviContext.Provider>
  );
};

// a custom hook
export const useNdvi = () => useContext(NdviContext);
