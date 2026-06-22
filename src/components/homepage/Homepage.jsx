import React from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../auth/AuthService";

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = isUserLoggedIn();

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center bg-light position-relative"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        paddingTop: "80px",
      }}
    >
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Left Column: Core Hero Text & Action Triggers */}
          <div className="col-12 col-md-7 text-center text-md-start">
            <div className="d-inline-flex align-items-center gap-2 mb-3 bg-white px-3 py-1.5 rounded-pill shadow-sm border border-light-subtle">
              <span
                className="text-dark fw-bold"
                style={{ fontSize: "0.9rem" }}
              >
                ⬢
              </span>
              <span className="text-secondary small fw-medium">
                Platform Live v1.0
              </span>
            </div>

            <h1
              className="display-4 fw-bold tracking-tight text-dark mb-3"
              style={{ letterSpacing: "-1.5px" }}
            >
              Your wellness, <br />
              perfectly synchronized.
            </h1>

            <p
              className="lead text-secondary mb-4 fs-5"
              style={{ maxWidth: "520px", lineHeight: "1.6" }}
            >
              A secure, intelligent digital health platform designed to track
              your cycles, analyze symptoms, and bring metric-driven clarity to
              your personal well-being.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start gap-3">
              <button
                onClick={() =>
                  navigate(isAuthenticated ? "/userDashboard" : "/register")
                }
                className="btn btn-dark btn-lg px-4 py-2.5 fw-medium"
                style={{ borderRadius: "6px", fontSize: "1rem" }}
              >
                {isAuthenticated
                  ? "Enter Workspace Panel →"
                  : "Get Started Free"}
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline-secondary btn-lg px-4 py-2.5 bg-white fw-medium text-dark"
                  style={{ borderRadius: "6px", fontSize: "1rem" }}
                >
                  Sign In to Account
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Clean Grid Features Mockup */}
          <div className="col-12 col-md-5">
            <div className="row g-3">
              <div className="col-6">
                <div
                  className="card border-0 shadow-sm p-4 bg-white"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="text-dark fw-bold mb-2">01 / Track</div>
                  <small className="text-secondary d-block">
                    Log metrics daily with immediate feedback analytics.
                  </small>
                </div>
              </div>

              <div className="col-6">
                <div
                  className="card border-0 shadow-sm p-4 bg-white"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="text-dark fw-bold mb-2">02 / Secure</div>
                  <small className="text-secondary d-block">
                    JWT validated structural security parameters.
                  </small>
                </div>
              </div>

              <div className="col-12">
                <div
                  className="card border-0 shadow-sm p-4 bg-white"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-dark fw-bold">
                      03 / Analytics Overview
                    </span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill small px-2">
                      Active
                    </span>
                  </div>
                  <div className="progress mb-2" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-dark"
                      role="progressbar"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <small className="text-secondary d-block">
                    System metrics dashboard updating live.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SIMPLIFIED FLOATING CHATBOT ICON ================= */}
      <div
        className="position-fixed bottom-0 end-0 m-4 d-flex align-items-center gap-2"
        style={{ zIndex: 1050 }}
      >
        {/* Simple text element next to the icon */}
        <span className="text-secondary small fw-medium px-1">
          Chat with AuraAI
        </span>

        <div
          className="btn btn-dark rounded-pill shadow-lg p-0 d-flex align-items-center justify-content-center border border-secondary border-opacity-25"
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#1a1a1a",
            cursor: "default",
          }}
          title="AuraAI Bot"
        >
          <span style={{ fontSize: "1.5rem" }}>🤖</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
