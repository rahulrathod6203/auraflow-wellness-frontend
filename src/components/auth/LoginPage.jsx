import React, { useState } from "react";
import { getToken, login, saveLoggedInUser, storeToken } from "./AuthService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Showcase UI state handling

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
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div
        className="w-100 position-relative"
        style={{
          maxWidth: "520px",
          padding: "40px 20px 20px 20px", // Increased top padding to account for the close button
          border: "0.4px solid",
          borderRadius: "12px",
        }}
      >
        {/* Top Right Close Button */}
        <button
          onClick={() => navigate(-1)} // Takes the user back to the previous page
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
            Sign in to AuraFlow
          </h2>
          <p className="text-muted small">
            Enter your credentials to access your account
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

        {/* Auth Card */}
        <div
          className="card border-0 shadow-sm p-4 bg-white"
          style={{ borderRadius: "12px" }}
        >
          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="mb-3">
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

            {/* Password Field */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label
                  htmlFor="password"
                  className="form-label small fw-medium text-secondary mb-0"
                >
                  Password
                </label>
              </div>
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

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-dark w-100 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
              style={{ borderRadius: "6px", fontSize: "0.95rem" }}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Bottom Footer Navigation Links */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-dark fw-medium text-decoration-none border-bottom border-secondary"
            >
              Sign up
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

export default LoginPage;
