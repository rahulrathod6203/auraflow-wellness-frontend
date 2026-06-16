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

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    if (errorMessage) setErrorMessage("");

    if (fieldErrors[e.target.id]) {
      setFieldErrors({ ...fieldErrors, [e.target.id]: "" });
    }
  };

  const closeForm = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setFieldErrors({ email: "", password: "" });

    login(userData)
      .then((response) => {
        setSuccessMessage(response.data.message || "Login successful!");
        setUserData({ email: "", password: "" });

        const token = "Bearer " + response.data.token;
        storeToken(token);

        saveLoggedInUser(response.data.user.id);
        console.log(response.data.user.id);

        navigate("/userDashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          console.log(error.response.data);

          const message = error.response.data.message;
          const backendErrors = error.response.data.fieldErrors;

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
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        /* Soft, holistic organic design background composition */
        background: `
          radial-gradient(circle at 10% 20%, rgba(255, 64, 129, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(103, 58, 183, 0.08) 0%, transparent 45%),
          radial-gradient(circle at 50% 0%, rgba(224, 242, 241, 0.6) 0%, transparent 50%),
          #f4f6f5
        `,
        paddingTop: "60px",
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
            className="w-100 p-4 p-sm-5 border-0 shadow-lg text-dark bg-white position-relative" // Added position-relative here
            style={{
              /* Expanded sizing context parameters */
              maxWidth: "540px",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            }}
          >
            <button
              onClick={closeForm}
              className="btn btn-link position-absolute top-0 end-0 m-3 p-2 text-decoration-none text-muted"
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                lineHeight: "1",
              }}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Soft Contrast Branding Header Layout */}
            <div className="text-center mb-5">
              <h1
                className="fw-bold d-flex align-items-center justify-content-center gap-2 mb-2"
                style={{ color: "#2d3748", letterSpacing: "-1px" }}
              >
                <span style={{ color: "#ff4081" }}>♥️</span>AuraFlow
              </h1>
              <p className="text-muted small">
                Sign in to your personalized health & cycle companion
              </p>
            </div>

            {/* Common Success Message Banner */}
            {successMessage && (
              <div className="alert alert-success py-2.5 small text-center mb-2 border-0 rounded-3">
                {successMessage}
              </div>
            )}

            {/* Fallback Global Error Message Banner */}
            {errorMessage && !Object.values(fieldErrors).some(Boolean) && (
              <div className="alert alert-danger py-2.5 small text-center mb-2 border-0 rounded-3">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Address Input Block */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label fw-semibold small text-secondary mb-2"
                >
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className={`form-control form-control-lg bg-light border-1 px-3 py-2.5 ${fieldErrors.email ? "is-invalid border border-danger bg-white" : ""}`}
                  style={{
                    fontSize: "0.95rem",
                    borderRadius: "12px",
                    color: "#2d3748",
                  }}
                  id="email"
                  placeholder="name@example.com"
                  value={userData.email}
                  onChange={handleChange}
                />
                {fieldErrors.email && (
                  <div
                    className="text-danger small mt-2 ps-1 fw-medium"
                    style={{ fontSize: "0.82rem" }}
                  >
                    ⚠️ {fieldErrors.email}
                  </div>
                )}
              </div>

              {/* Password Input Block */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label fw-semibold small text-secondary mb-2"
                >
                  Password
                </label>
                <input
                  required
                  type="password"
                  className={`form-control form-control-lg bg-light border-1 px-3 py-2.5 ${fieldErrors.password ? "is-invalid border border-danger bg-white" : ""}`}
                  style={{
                    fontSize: "0.95rem",
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
                    className="text-danger small mt-2 ps-1 fw-medium"
                    style={{ fontSize: "0.82rem" }}
                  >
                    ⚠️ {fieldErrors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn w-100 py-2 fw-bold text-white shadow border-0 rounded-pill"
                style={{
                  background:
                    "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
                  fontSize: "1rem",
                  letterSpacing: "0.3px",
                }}
              >
                Sign In
              </button>
            </form>

            <div className="text-center mt-1 pt-2 border-top border-light">
              <span className="text-muted small">New to AuraFlow? </span>
              <a
                href="/register"
                className="text-decoration-none small fw-bold ms-1"
                style={{ color: "#ff4081" }}
              >
                Create your account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
