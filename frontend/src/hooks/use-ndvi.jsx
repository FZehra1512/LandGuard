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
            fromDate: item.from_date,
            toDate: item.to_date,
            interval: item.interval_days,
            ndvi: Number(item?.ndvi_stats?.mean || item?.ndvi_stats[0]?.stats?.mean).toFixed(3),
            minndvi: Number(item?.ndvi_stats?.min || item?.ndvi_stats[0]?.stats?.min).toFixed(3),
            maxndvi: Number(item?.ndvi_stats?.max || item?.ndvi_stats[0]?.stats?.max).toFixed(3),
            sampleCount: item?.ndvi_stats?.sampleCount || item?.ndvi_stats[0]?.stats?.sampleCount,
            type: "Polygon",
            coordinates: item.coordinates[0],
            area: item?.area || ""
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
