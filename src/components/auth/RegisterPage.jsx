import React, { useState } from "react";
import { register } from "./AuthService";

const RegisterPage = () => {
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

          // const { message, fieldErrors: backendErrors } = error.response.data;
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
    <div className="container min-vh-100 d-flex align-items-start justify-content-center pt-5">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#ff4081" }}>
            🩷 Aura
          </h2>
          <p className="text-muted">Create your account</p>
          <p className="text-muted small">
            Track your cycles. Understand your body.
          </p>
        </div>

        {/* Common Success Message Banner */}
        {successMessage && (
          <div className="alert alert-success py-2 small text-center mb-3">
            {successMessage}
          </div>
        )}

        {/* Fallback Global Error Message Banner (Only shows if no specific field errors are caught) */}
        {errorMessage && !Object.values(fieldErrors).some(Boolean) && (
          <div className="alert alert-danger py-2 small text-center mb-3">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Row 1: Name and Email side-by-side */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                required
                type="text"
                className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                id="name"
                placeholder="Enter full name"
                value={userData.name}
                onChange={handleChange}
              />
              {fieldErrors.name && (
                <div
                  className="text-danger small mt-1 ps-1"
                  style={{ fontSize: "0.85rem" }}
                >
                  ⚠️ {fieldErrors.name}
                </div>
              )}
            </div>
            <div className="col-md-6">
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
          </div>

          {/* Row 2: Password and Phone side-by-side */}
          <div className="row mb-3">
            <div className="col-md-6">
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
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                required
                type="tel"
                className={`form-control ${fieldErrors.phone ? "is-invalid" : ""}`}
                id="phone"
                placeholder="Enter phone number"
                value={userData.phone}
                onChange={handleChange}
              />
              {fieldErrors.phone && (
                <div
                  className="text-danger small mt-1 ps-1"
                  style={{ fontSize: "0.85rem" }}
                >
                  ⚠️ {fieldErrors.phone}
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Address (Full Width) */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              required
              type="text"
              className={`form-control ${fieldErrors.address ? "is-invalid" : ""}`}
              id="address"
              placeholder="Enter street address, apartment, or suite"
              value={userData.address}
              onChange={handleChange}
            />
            {fieldErrors.address && (
              <div
                className="text-danger small mt-1 ps-1"
                style={{ fontSize: "0.85rem" }}
              >
                ⚠️ {fieldErrors.address}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{ backgroundColor: "#ff4081", color: "white" }}
          >
            Register
          </button>
        </form>

        <div className="text-center">
          <span className="text-muted">Already have an account? </span>
          <a href="/login" className="text-decoration-none">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
