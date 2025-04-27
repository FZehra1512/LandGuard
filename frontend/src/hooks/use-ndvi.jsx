import { createContext, useContext, useState, useEffect } from "react";
import { getNDVIData } from "@/api/mapDataEndpoints";
import { formatNDVIData } from "@/lib/utils";

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
        if (data?.length) {
          const formatted = formatNDVIData(data);
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
