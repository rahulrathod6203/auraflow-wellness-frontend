import React, { useState } from "react";
import { getToken, login, saveLoggedInUser, storeToken } from "./AuthService"; // Assuming your login function is exported here
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Individual field error states
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    if (errorMessage) setErrorMessage("");

    // Clear the individual field error when the user begins retyping
    if (fieldErrors[e.target.id]) {
      setFieldErrors({ ...fieldErrors, [e.target.id]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setFieldErrors({ email: "", password: "" }); // Reset field errors

    login(userData)
      .then((response) => {
        setSuccessMessage(response.data.message || "Login successful!");

        setUserData({ email: "", password: "" });

        const token = "Bearer " + response.data.token;
        storeToken(token);
        const updatedToken = getToken(token);
        // console.log(updatedToken);

        saveLoggedInUser(userData.email);
        navigate("/userDashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          console.log(error.response.data);

          // const { message, fieldErrors: backendErrors } = error.response.data;
          const message = error.response.data.message;
          const backendErrors = error.response.data.fieldErrors;

          // 2. Handle standard validation annotation errors
          if (backendErrors) {
            setFieldErrors({
              email: backendErrors.email || "",
              password: backendErrors.password || "",
            });
          }

          setErrorMessage(message || "Login failed. Please check your inputs.");
        } else {
          setErrorMessage("Network Error: Server is unreachable.");
        }
      });
  };

  return (
    <div className="container min-vh-100 d-flex align-items-start justify-content-center pt-5">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "600px", width: "100%" }} // Adjusted container sizing perfectly for a clean dual-field form layout
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#ff4081" }}>
            🩷 Aura
          </h2>
          <p className="text-muted">Sign in to your account</p>
        </div>

        {/* Common Success Message Banner */}
        {successMessage && (
          <div className="alert alert-success py-2 small text-center mb-3">
            {successMessage}
          </div>
        )}

        {/* Fallback Global Error Message Banner (Shows up if credentials fail universally) */}
        {errorMessage && !Object.values(fieldErrors).some(Boolean) && (
          <div className="alert alert-danger py-2 small text-center mb-3">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Address Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              required
              type="email"
              className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter email"
              value={userData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && (
              <div
                className="text-danger small mt-1 ps-1"
                style={{ fontSize: "0.85rem" }}
              >
                ⚠️ {fieldErrors.email}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Enter password"
              value={userData.password}
              onChange={handleChange}
            />
            {fieldErrors.password && (
              <div
                className="text-danger small mt-1 ps-1"
                style={{ fontSize: "0.85rem" }}
              >
                ⚠️ {fieldErrors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{ backgroundColor: "#ff4081", color: "white" }}
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <span className="text-muted">Don't have an account? </span>
          <a href="/register" className="text-decoration-none">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
