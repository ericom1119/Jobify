import axios from "axios";
import store from "./store";
import { LOGOUT } from "./actions/userActions";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(error);
  }
);

export default api;
