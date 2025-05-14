import api from "./api";

export const createDrive = async (payload) => {
    try {
      const response = await api.post('/drive/create/', payload);
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
      const response = await api.get('/drive/getAll/');
      return { code: response.status, data: response.data };
    } catch (error) {
      return {
        code: error.response?.status || 500,
        data: error.response?.data || error.message,
      };
    }
  };

export const createLandPost = async (formData) => {
  try {
    const response = await api.post('/post/create/', formData);
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
};


  export const getPosts = async () => {
    try {
      const response = await api.get('/post/getAll');
      return { code: response.status, data: response.data };
    } catch (error) {
      return {
        code: error.response?.status || 500,
        data: error.response?.data || error.message,
      };
    }
  };


export const joinDrive = async (driveId) => {
  try {
    const response = await api.post(`/drives/${driveId}/join`);
    return response.data;
  } catch (error) {
    console.error("Join drive error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
