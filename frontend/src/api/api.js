// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// TODO: remove these USAGE HELP lines once the component is used
// const res = await api.get('/user')
// const res = await api.post('/posts', {
//     title: 'My Post',
//     content: 'Hello World',
//   });
