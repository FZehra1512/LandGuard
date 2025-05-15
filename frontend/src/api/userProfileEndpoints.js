import api from "./api";

export const getUserDetails = async () => {
  try {
    const response = await api.get("/users/me/");
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};

export const editUserDetails = async () => {
  try {
    const response = await api.put("/users/me/edit/");
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};

export const deleteUser = async () => {
  try {
    const response = await api.delete("/users/me/delete/");
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};

export const changePassword = async () => {
  try {
    const response = await api.patch("/users/me/change-password/");
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};
