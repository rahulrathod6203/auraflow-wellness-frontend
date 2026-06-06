import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({
    email: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.id]: e.target.value });
    if (errorMessage) setErrorMessage("");

    if (fieldErrors[e.target.id]) {
      setFieldErrors({ ...fieldErrors, [e.target.id]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setFieldErrors({ email: "", message: "" });

    // Client-side quick email pattern verification validation loop
    if (!contactData.email.includes("@")) {
      setFieldErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email signature.",
      }));
      return;
    }

    // Success state callback logic execution
    setSuccessMessage(
      "Message sent successfully! Our team will respond shortly.",
    );
    setContactData({ email: "", message: "" });
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        /* Soft, holistic organic design background composition matching your ecosystem */
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
            className="w-100 p-4 p-sm-5 border-0 shadow-lg text-dark bg-white"
            style={{
              /* Sleek, compact profile footprint matching Login & Register setups */
              maxWidth: "540px",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* Soft Contrast Branding Header Layout */}
            <div className="text-center mb-4">
              <h1
                className="fw-bold d-flex align-items-center justify-content-center gap-2 mb-2"
                style={{ color: "#2d3748", letterSpacing: "-1px" }}
              >
                <span style={{ color: "#ff4081" }}>♥️</span>AuraFlow
              </h1>
              <p className="text-muted small mb-1">Contact Support Team</p>
              <p
                className="text-muted text-opacity-75"
                style={{ fontSize: "0.8rem" }}
              >
                Have questions? We are here to help you sync up.
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
              {/* Email Input Box Block */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label fw-semibold small text-secondary mb-1"
                >
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className={`form-control bg-light px-3 py-2 ${fieldErrors.email ? "is-invalid border-danger bg-white" : ""}`}
                  style={{
                    fontSize: "0.9rem",
                    borderRadius: "12px",
                    color: "#2d3748",
                    border: fieldErrors.email
                      ? ""
                      : "1.5px solid rgba(255, 64, 129, 0.4)", // Signature pink border line
                    boxShadow: "none",
                  }}
                  id="email"
                  placeholder="name@example.com"
                  value={contactData.email}
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

              {/* Message Input Area Block */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="form-label fw-semibold small text-secondary mb-1"
                >
                  Message
                </label>
                <textarea
                  required
                  rows="3"
                  className={`form-control bg-light px-3 py-2 ${fieldErrors.message ? "is-invalid border-danger bg-white" : ""}`}
                  style={{
                    fontSize: "0.9rem",
                    borderRadius: "12px",
                    color: "#2d3748",
                    border: fieldErrors.message
                      ? ""
                      : "1.5px solid rgba(255, 64, 129, 0.4)", // Signature pink border line
                    boxShadow: "none",
                    resize: "none",
                  }}
                  id="message"
                  placeholder="Type your message here..."
                  value={contactData.message}
                  onChange={handleChange}
                />
                {fieldErrors.message && (
                  <div
                    className="text-danger small mt-1 ps-1 fw-medium"
                    style={{ fontSize: "0.8rem" }}
                  >
                    ⚠️ {fieldErrors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn w-100 py-2.5 fw-bold text-white shadow border-0 rounded-pill"
                style={{
                  background:
                    "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
                  fontSize: "0.95rem",
                  letterSpacing: "0.3px",
                }}
              >
                Send Message
              </button>
            </form>

            <div className="text-center  pt-3 border-top border-light">
              <a
                onClick={() => navigate("/")}
                className="text-decoration-none small fw-bold ms-1"
                style={{ color: "#ff4081", cursor: "pointer" }}
              >
                ← Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
