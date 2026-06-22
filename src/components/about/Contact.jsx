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
  const [isLoading, setIsLoading] = useState(false); // Structural loading state tracking

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
    setIsLoading(true);

    // Client-side quick validation loop simulating network conditions
    if (!contactData.email.includes("@")) {
      setIsLoading(false);
      setFieldErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    // Mock API submission lag
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        "Message sent successfully! Our team will respond shortly.",
      );
      setContactData({ email: "", message: "" });
    }, 800);
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: "520px",
          padding: "20px",
          border: "0.4px solid",
          borderRadius: "12px",
        }}
      >
        {/* Minimal Branding / Header Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold tracking-tight text-dark mb-1">
            Get in touch
          </h2>
          <p className="text-muted small">
            Have questions? We are here to help you sync up.
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

        {/* Support Card Frame */}
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
                Email Address
              </label>
              <input
                required
                type="email"
                id="email"
                className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                placeholder="name@example.com"
                value={contactData.email}
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

            {/* Message Field */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="form-label small fw-medium text-secondary"
              >
                Message
              </label>
              <textarea
                required
                rows="4"
                id="message"
                className={`form-control ${fieldErrors.message ? "is-invalid" : ""}`}
                placeholder="Type your message here..."
                value={contactData.message}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  resize: "none",
                }}
              />
              {fieldErrors.message && (
                <div className="invalid-feedback small mt-1">
                  {fieldErrors.message}
                </div>
              )}
            </div>

            {/* Action Submit Button */}
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
                  <span>Sending message...</span>
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        {/* Bottom Back Navigation */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link btn-sm text-muted text-decoration-none"
          >
            ← Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
