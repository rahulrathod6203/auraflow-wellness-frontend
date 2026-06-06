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

  // Individual field error states
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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
    setFieldErrors({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    }); // Reset field errors

    register(userData)
      .then((response) => {
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
        console.log(error);
        if (error.response && error.response.data) {
          console.log(error.response.data);

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
          setErrorMessage("Network Error: Server is unreachable.");
        }
      });
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        /* Soft, holistic organic design background composition matching LoginPage */
        background: `
          radial-gradient(circle at 10% 20%, rgba(255, 64, 129, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(103, 58, 183, 0.08) 0%, transparent 45%),
          radial-gradient(circle at 50% 0%, rgba(224, 242, 241, 0.6) 0%, transparent 50%),
          #f4f6f5
        `,
        paddingTop: "70px",
      }}
    >
      {/* Background Decorative Floral/Abstract Elements representing wellness shapes */}
      <div
        className="position-absolute opacity-25 d-none d-lg-block"
        style={{ top: "15%", left: "10%", fontSize: "5rem" }}
      >
        🌿
      </div>
      <div
        className="position-absolute opacity-25 d-none d-lg-block"
        style={{ bottom: "15%", right: "12%", fontSize: "5rem" }}
      >
        🌸
      </div>
      <div
        className="position-absolute opacity-10 d-none d-lg-block"
        style={{ bottom: "20%", left: "15%", fontSize: "6rem" }}
      >
        ✨
      </div>
      <div
        className="position-absolute opacity-15 d-none d-lg-block"
        style={{ top: "20%", right: "15%", fontSize: "4rem" }}
      >
        🎯
      </div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="d-flex justify-content-center">
          <div
            className="w-100 p-4 p-sm-5 border-0 shadow-lg text-dark bg-white"
            style={{
              /* Updated to match your preferred small, compact profile footprint */
              maxWidth: "550px",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* Soft Contrast Branding Header Layout */}
            <div className="text-center mb-5">
              <h1
                className="fw-bold d-flex align-items-center justify-content-center gap-2 mb-2"
                style={{ color: "#2d3748", letterSpacing: "-1px" }}
              >
                <span style={{ color: "#ff4081" }}>♥️</span>AuraFlow
              </h1>

              <p
                className="text-muted text-opacity-75"
                style={{ fontSize: "0.8rem" }}
              >
                Track your cycles. Understand your body.
              </p>
            </div>

            {/* Common Success Message Banner */}
            {successMessage && (
              <div className="alert alert-success py-2.5 small text-center mb-3 border-0 rounded-3">
                {successMessage}
              </div>
            )}

            {/* Fallback Global Error Message Banner */}
            {errorMessage && !Object.values(fieldErrors).some(Boolean) && (
              <div className="alert alert-danger py-2.5 small text-center mb-3 border-0 rounded-3">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Row 1: Name and Email side-by-side */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="name"
                    className="form-label fw-semibold small text-secondary mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className={`form-control bg-light border-1 px-3 py-2 ${fieldErrors.name ? "is-invalid border border-danger bg-white" : ""}`}
                    style={{
                      fontSize: "0.9rem",
                      borderRadius: "12px",
                      color: "#2d3748",
                    }}
                    id="name"
                    placeholder="Full name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                  {fieldErrors.name && (
                    <div
                      className="text-danger small mt-1 ps-1 fw-medium"
                      style={{ fontSize: "0.8rem" }}
                    >
                      ⚠️ {fieldErrors.name}
                    </div>
                  )}
                </div>
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold small text-secondary mb-1"
                  >
                    Email address
                  </label>
                  <input
                    required
                    type="email"
                    className={`form-control bg-light border-1 px-3 py-2 ${fieldErrors.email ? "is-invalid border border-danger bg-white" : ""}`}
                    style={{
                      fontSize: "0.9rem",
                      borderRadius: "12px",
                      color: "#2d3748",
                    }}
                    id="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                  {fieldErrors.email && (
                    <div
                      className="text-danger small mt-1 ps-1 fw-medium"
                      style={{ fontSize: "0.8rem" }}
                    >
                      ⚠️ {fieldErrors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Password and Phone side-by-side */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold small text-secondary mb-1"
                  >
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    className={`form-control bg-light border-1 px-3 py-2 ${fieldErrors.password ? "is-invalid border border-danger bg-white" : ""}`}
                    style={{
                      fontSize: "0.9rem",
                      borderRadius: "12px",
                      color: "#2d3748",
                    }}
                    id="password"
                    placeholder="••••••••"
                    value={userData.password}
                    onChange={handleChange}
                  />
                  {fieldErrors.password && (
                    <div
                      className="text-danger small mt-1 ps-1 fw-medium"
                      style={{ fontSize: "0.8rem" }}
                    >
                      ⚠️ {fieldErrors.password}
                    </div>
                  )}
                </div>
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="phone"
                    className="form-label fw-semibold small text-secondary mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    className={`form-control bg-light border-1 px-3 py-2 ${fieldErrors.phone ? "is-invalid border border-danger bg-white" : ""}`}
                    style={{
                      fontSize: "0.9rem",
                      borderRadius: "12px",
                      color: "#2d3748",
                    }}
                    id="phone"
                    placeholder="Phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                  {fieldErrors.phone && (
                    <div
                      className="text-danger small mt-1 ps-1 fw-medium"
                      style={{ fontSize: "0.8rem" }}
                    >
                      ⚠️ {fieldErrors.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 3: Address (Full Width) */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="form-label fw-semibold small text-secondary mb-1"
                >
                  Address
                </label>
                <input
                  required
                  type="text"
                  className={`form-control bg-light border-1 px-3 py-2 ${fieldErrors.address ? "is-invalid border border-danger bg-white" : ""}`}
                  style={{
                    fontSize: "0.9rem",
                    borderRadius: "12px",
                    color: "#2d3748",
                  }}
                  id="address"
                  placeholder="Street address, apartment, or suite"
                  value={userData.address}
                  onChange={handleChange}
                />
                {fieldErrors.address && (
                  <div
                    className="text-danger small mt-1 ps-1 fw-medium"
                    style={{ fontSize: "0.8rem" }}
                  >
                    ⚠️ {fieldErrors.address}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn w-100 py-2.5 fw-bold text-white shadow border-0 rounded-pill"
                style={{
                  background:
                    "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
                  fontSize: "1rem",
                  letterSpacing: "0.3px",
                }}
              >
                Sign Up
              </button>
            </form>

            <div className="text-center mt-2 pt-2 border-top border-light">
              <span className="text-muted small">
                Already have an account?{" "}
              </span>
              <a
                href="/login"
                className="text-decoration-none small fw-bold ms-1"
                style={{ color: "#ff4081" }}
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
