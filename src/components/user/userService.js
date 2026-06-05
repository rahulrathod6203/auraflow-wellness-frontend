import axios from "axios";

const USER_BASE_URL = "http://localhost:8080/api/v1";

// User Operations

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUserById = (id) => axios.get(`${USER_BASE_URL}/users/${id}`);
export const updateUser = (id, data) =>
  axios.put(`${USER_BASE_URL}/users/${id}`, data);
