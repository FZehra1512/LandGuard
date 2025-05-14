import api from "./api";

export const updateNDVIData = async (payload) => {
  try {
    const response = await api.post("/ndvi/multiple/", { ...payload });
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};

export const addLocation = async (payload) => {
    try {
      const response = await api.post("/ndvi/save/", { ...payload });
      return { code: response.status, data: response.data };
    } catch (error) {
      return {
        code: error.response?.status || 500,
        data: error.response?.data || error.response,
      };
    }
  };
