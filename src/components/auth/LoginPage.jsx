import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  login,
  storeToken,
  saveLoggedInUser,
  saveLoggedInUserEmail,
} from "./AuthService";
import aura from "../../assets/aura.jpg";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  // Memorable and simple state structures
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync inputs dynamically and clear error overlays on type
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    if (errorMessage) setErrorMessage("");
    if (fieldErrors[e.target.id]) {
      setFieldErrors({ ...fieldErrors, [e.target.id]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setFieldErrors({ email: "", password: "" });
    setIsLoading(true);

    login(userData)
      .then((response) => {
        setIsLoading(false);
        setSuccessMessage(response.data.message || "Login successful!");
        setUserData({ email: "", password: "" });

        const token = "Bearer " + response.data.token;
        storeToken(token);
        saveLoggedInUser(response.data.user.id);
        saveLoggedInUserEmail(response.data.user.email);

        navigate("/userDashboard");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response && error.response.data) {
          const message = error.response.data.message;
          const backendErrors = error.response.data.fieldErrors;

          if (backendErrors) {
            setFieldErrors({
              email: backendErrors.email || "",
              password: backendErrors.password || "",
            });
          }
          setErrorMessage(message || "Invalid email or password.");
        } else {
          setErrorMessage("Network Error: The server is unreachable.");
        }
      });
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${aura})` }}>
      <div className="login-card card shadow-sm border-0">
        {/* Top Right Close Button */}
        <button
          onClick={() => navigate("/")}
          className="login-close-btn"
          title="Go back"
        >
          &times;
        </button>

        {/* Branding / Header Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-1">AuraFlow</h2>
          <p className="text-muted small">Sign in to your account</p>
        </div>

        {/* Global Feedback Banners */}
        {successMessage && (
          <div className="alert alert-success border-0 small text-center mb-3 py-2">
            {successMessage}
          </div>
        )}

        {errorMessage && !Object.values(fieldErrors).some(Boolean) && (
          <div className="alert alert-danger border-0 small text-center mb-3 py-2">
            {errorMessage}
          </div>
        )}

        {/* Interaction Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label small fw-medium text-secondary"
            >
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="name@example.com"
              className={`form-control login-input ${fieldErrors.email ? "is-invalid" : ""}`}
              value={userData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {fieldErrors.email && (
              <div className="invalid-feedback small mt-1">
                {fieldErrors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label small fw-medium text-secondary"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              placeholder="••••••••"
              className={`form-control login-input ${fieldErrors.password ? "is-invalid" : ""}`}
              value={userData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            {fieldErrors.password && (
              <div className="invalid-feedback small mt-1">
                {fieldErrors.password}
              </div>
            )}
          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-dark w-100 py-2 login-btn"
          >
            {isLoading ? "Connecting..." : "Sign In"}
          </button>
        </form>

        {/* Footer Navigation Link */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            New here?{" "}
            <button
              onClick={() => navigate("/register")}
              className="btn btn-link btn-sm text-dark fw-semibold p-0 text-decoration-none"
              style={{ verticalAlign: "baseline" }}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
