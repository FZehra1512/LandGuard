import api from "./api";

export const signUpUser = async (payload) => {
  try {
    const response = await api.post("/signup/", { ...payload });
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};

export const loginUser = async (payload) => {
    try {
      const response = await api.post("/login/", { ...payload });
      return { code: response.status, data: response.data };
    } catch (error) {
      return {
        code: error.response?.status || 500,
        data: error.response?.data || error.response,
      };
    }
  };

export const validateUser = async () => {
  try {
    const response = await api.get("/validateUser/");
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};

export const logoutUser = async () => {
  try {
    const payload = {
      refresh: localStorage.getItem("landGuardRefreshtoken"),
      access: localStorage.getItem("landGuardtoken"),
    };
    const response = await api.post("/logout/", { ...payload });
    return { code: response.status, data: response.data };
  } catch (error) {
    return {
      code: error.response?.status || 500,
      data: error.response?.data || error.response,
    };
  }
};
