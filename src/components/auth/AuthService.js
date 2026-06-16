import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/auth";

export const register = (userData) =>
  axios.post(`${BASE_URL}/register`, userData);

export const login = (userCredentials) =>
  axios.post(`${BASE_URL}/login`, userCredentials);

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (id) =>
  sessionStorage.setItem("authenticatedUser", id);

export const isUserLoggedIn = (email) => {
  const loggedInUser = sessionStorage.getItem("authenticatedUser");

  if (loggedInUser == null) {
    return false;
  } else {
    return true;
  }
  console.log(loggedInUser);
};

export const getLoggedInUser = () => {
  const loggedInUserEmail = sessionStorage.getItem("authenticatedUser");
  //console.log(loggedInUserEmail);

  return loggedInUserEmail;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  // window.location.reload(false);
};
