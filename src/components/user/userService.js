import axios from "axios";
import { getToken } from "../auth/AuthService";

const BASE_URL = "http://localhost:8080/api/v1/users";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export const getUserById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const getAllUsers = (pageNo = 0, pageSize = 10) => {
  return axios.get(`${BASE_URL}?pageNo=${pageNo}&pageSize=${pageSize}`);
};
