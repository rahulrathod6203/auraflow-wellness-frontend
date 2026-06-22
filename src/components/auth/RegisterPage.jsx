import React, { useState } from "react";
import { register } from "./AuthService";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false); // UI State handling for form submissions

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
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "40px 0",
      }}
    >
      <div
        className="w-100 position-relative"
        style={{
          maxWidth: "520px",
          padding: "40px 20px 20px 20px", // Balanced top padding for the close button
          border: "0.4px solid",
          borderRadius: "12px",
        }}
      >
        {/* Top Right Close Button */}
        <button
          onClick={() => navigate(-1)} // Navigates back to the previous view history layer
          className="btn btn-sm text-secondary p-0 border-0 position-absolute"
          style={{
            top: "16px",
            right: "20px",
            fontSize: "1.5rem",
            lineHeight: 1,
            opacity: 0.6,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          title="Close and go back"
        >
          &times;
        </button>

        {/* Minimal Branding */}
        <div className="text-center mb-4">
          <h2 className="fw-bold tracking-tight text-dark mb-1">
            Create your account
          </h2>
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

        {/* Register Card */}
        <div
          className="card border-0 shadow-sm p-4 bg-white"
          style={{ borderRadius: "12px" }}
        >
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
                  className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                  placeholder="Jane Doe"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ borderRadius: "6px", fontSize: "0.95rem" }}
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
                  className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                  placeholder="you@example.com"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ borderRadius: "6px", fontSize: "0.95rem" }}
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
                  className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                  placeholder="••••••••"
                  value={userData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ borderRadius: "6px", fontSize: "0.95rem" }}
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
                  className={`form-control ${fieldErrors.phone ? "is-invalid" : ""}`}
                  placeholder="1234567890"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ borderRadius: "6px", fontSize: "0.95rem" }}
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
                className={`form-control ${fieldErrors.address ? "is-invalid" : ""}`}
                placeholder="Street address, apartment, or suite"
                value={userData.address}
                onChange={handleChange}
                disabled={isLoading}
                style={{ borderRadius: "6px", fontSize: "0.95rem" }}
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
              className="btn btn-dark w-100 py-2.5 fw-medium d-flex align-items-center justify-content-center gap-2"
              style={{ borderRadius: "6px", fontSize: "0.95rem" }}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span>Creating account...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        {/* Bottom Navigation Links */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-dark fw-medium text-decoration-none border-bottom border-secondary"
            >
              Login
            </a>
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn btn-link btn-sm text-muted text-decoration-none mt-2"
          >
            ← Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
