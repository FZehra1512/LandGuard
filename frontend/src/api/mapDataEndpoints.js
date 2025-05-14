import api from "./api";

export const getNDVIData = async () => {
  try {
    const response = await api.get("/ndvi/getAll/");
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};

export const getHistoricalData = async (payload) => {
  try {
    const response = await api.post("/ndvi/", { ...payload });
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};
