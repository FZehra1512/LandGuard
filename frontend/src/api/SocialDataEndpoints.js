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
      const response = await api.get('/post/getAll/');
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
    const response = await api.post(`/drives/${driveId}/join/`);
    return response.data;
  } catch (error) {
    console.error("Join drive error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const getUserDrives = async () => {
  try {
    const response = await api.get('/drive/my-drives'); 
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
};

export const deleteDrive = async (driveId) => {
  try {
    const response = await api.delete(`/drives/${driveId}/`);
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
};

export const getUserPosts = async () => {
  try {
    const response = await api.get("/post/my-posts");
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
};

export const deleteUserPost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}/`);
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
};
