import api from "./api";

export const createDrive = async (payload) => {
    try {
      const response = await api.post('/create-drive/', payload);
      return { code: response.status, data: response.data };
    } catch (error) {
      return {
        code: error.response?.status || 500,
        data: error.response?.data || error.message,
      };
    }
  };
  
  export const getDrives = async () => {
    try {
      const response = await api.get('/get-drives');
      return { code: response.status, data: response.data };
    } catch (error) {
      return {
        code: error.response?.status || 500,
        data: error.response?.data || error.message,
      };
    }
  };