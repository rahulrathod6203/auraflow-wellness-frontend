import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/v1/auth/";

export const register = (userData) => {
  axios.post(AUTH_URL + "register", userData).catch((error) => {
    console.log(error.response.data);
  });
};
