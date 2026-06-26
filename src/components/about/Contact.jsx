import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import aura from "../../assets/aura.jpg";
import { getLoggedInUserEmail, isUserLoggedIn } from "../auth/AuthService";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();
  const isAuthenticated = isUserLoggedIn();
  const loggedInEmail = getLoggedInUserEmail();

  const [formData, setFormData] = useState({ email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-fill email only if logged in
  useEffect(() => {
    if (isAuthenticated && loggedInEmail) {
      setFormData((prev) => ({ ...prev, email: loggedInEmail }));
    }
  }, [isAuthenticated, loggedInEmail]);

  const handleChange = (e) => {
    if (error) setError("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Simple & clean validation conditions
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter a message before sending.");
      return;
    }

    setSuccess(true);
    setFormData({ email: isAuthenticated ? loggedInEmail : "", message: "" });
  };

  return (
    <div
      className="contact-wrapper"
      style={{ backgroundImage: `url(${aura})` }}
    >
      <div className="contact-card card shadow-sm border-0">
        <button
          onClick={() => navigate(-1)}
          className="contact-close-btn"
          title="Go back"
        >
          &times;
        </button>

        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-1">Get in touch</h2>
          <p className="text-muted small">We're here to help you sync up.</p>
        </div>

        {success && (
          <div className="alert alert-success text-center small py-2">
            Message sent successfully!
          </div>
        )}
        {error && (
          <div className="alert alert-danger text-center small py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label text-secondary small fw-medium"
            >
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="name@example.com"
              className="form-control contact-input"
              value={formData.email}
              onChange={handleChange}
              disabled={isAuthenticated}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="form-label text-secondary small fw-medium"
            >
              Message
            </label>
            <textarea
              required
              rows="2"
              id="message"
              placeholder="Type your message here..."
              className="form-control contact-input no-resize"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2 contact-btn">
            Send Message
          </button>
        </form>

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
