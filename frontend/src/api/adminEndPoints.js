import api from "./api";

export const updateNDVIData = async (payload) => {
  try {
    const response = await api.post("/ndvi/multiple/", { ...payload });
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: response.status,
    };
  }
};

export const addLocation = async (payload) => {
    try {
      const response = await api.post("/ndvi/save/", { ...payload });
      return { code: response.status, data: response.data };
    } catch (error) {
      return {
        code: response.status,
      };
    }
  };
