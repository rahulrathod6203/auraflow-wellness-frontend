import React, { useState } from "react";
import { register } from "./AuthService";
import { useNavigate } from "react-router-dom";
import aura from "../../assets/aura.jpg"; // Keeps background asset unified
import "./RegisterPage.css"; // Externalized layout rules

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setFieldErrors({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });
    setIsLoading(true);

    register(userData)
      .then((response) => {
        setIsLoading(false);
        setSuccessMessage(response.data.message || "Registration successful!");
        setUserData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response && error.response.data) {
          const message = error.response.data.message;
          const backendErrors = error.response.data.fieldErrors;

          if (backendErrors) {
            setFieldErrors({
              name: backendErrors.name || "",
              email: backendErrors.email || "",
              password: backendErrors.password || "",
              phone: backendErrors.phone || "",
              address: backendErrors.address || "",
            });
          }
          setErrorMessage(
            message || "Registration failed. Please check your inputs.",
          );
        } else {
          setErrorMessage("Network Error: The server is unreachable.");
        }
      });
  };

  return (
    <div
      className="register-wrapper"
      style={{ backgroundImage: `url(${aura})` }}
    >
      <div className="register-card card shadow-sm border-0">
        {/* Top Right Close Button */}
        <button
          onClick={() => navigate("/")}
          className="register-close-btn"
          title="Close and go back"
        >
          &times;
        </button>

        {/* Branding Headers */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-1">Create your account</h2>
          <p className="text-muted small">
            Track your cycles. Understand your body.
          </p>
        </div>

        {/* Global Feedback Banners */}
        {successMessage && (
          <div
            className="alert alert-success border-0 small text-center mb-3 py-2"
            role="alert"
          >
            {successMessage}
          </div>
        )}

        {errorMessage && !Object.values(fieldErrors).some(Boolean) && (
          <div
            className="alert alert-danger border-0 small text-center mb-3 py-2"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Row 1: Name and Email */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label
                htmlFor="name"
                className="form-label small fw-medium text-secondary"
              >
                Full Name
              </label>
              <input
                required
                type="text"
                id="name"
                placeholder="Jane Doe"
                className={`form-control register-input ${fieldErrors.name ? "is-invalid" : ""}`}
                value={userData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
              {fieldErrors.name && (
                <div className="invalid-feedback small mt-1">
                  {fieldErrors.name}
                </div>
              )}
            </div>

            <div className="col-12 col-sm-6">
              <label
                htmlFor="email"
                className="form-label small fw-medium text-secondary"
              >
                Email address
              </label>
              <input
                required
                type="email"
                id="email"
                placeholder="you@example.com"
                className={`form-control register-input ${fieldErrors.email ? "is-invalid" : ""}`}
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
          </div>

          {/* Row 2: Password and Phone */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
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
                className={`form-control register-input ${fieldErrors.password ? "is-invalid" : ""}`}
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

            <div className="col-12 col-sm-6">
              <label
                htmlFor="phone"
                className="form-label small fw-medium text-secondary"
              >
                Phone Number
              </label>
              <input
                required
                type="tel"
                id="phone"
                placeholder="1234567890"
                className={`form-control register-input ${fieldErrors.phone ? "is-invalid" : ""}`}
                value={userData.phone}
                onChange={handleChange}
                disabled={isLoading}
              />
              {fieldErrors.phone && (
                <div className="invalid-feedback small mt-1">
                  {fieldErrors.phone}
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Address */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="form-label small fw-medium text-secondary"
            >
              Address
            </label>
            <input
              required
              type="text"
              id="address"
              placeholder="Street address, apartment, or suite"
              className={`form-control register-input ${fieldErrors.address ? "is-invalid" : ""}`}
              value={userData.address}
              onChange={handleChange}
              disabled={isLoading}
            />
            {fieldErrors.address && (
              <div className="invalid-feedback small mt-1">
                {fieldErrors.address}
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-dark w-100 py-2.5 register-btn"
          >
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span>Creating account...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Bottom Navigation Links */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="btn btn-link btn-sm text-dark fw-semibold p-0 text-decoration-none"
              style={{ verticalAlign: "baseline" }}
            >
              Login
            </button>
          </p>
          {/* <button
            onClick={() => navigate("/")}
            className="btn btn-link btn-sm text-muted text-decoration-none mt-2 d-block mx-auto"
          >
            ← Back to homepage
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
