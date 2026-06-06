import React from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../auth/AuthService"; // Adjust path to match your AuthService location

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = isUserLoggedIn();

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        /* Matches your LoginPage background composition perfectly */
        background: `
          radial-gradient(circle at 10% 20%, rgba(255, 64, 129, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(103, 58, 183, 0.08) 0%, transparent 45%),
          radial-gradient(circle at 50% 0%, rgba(224, 242, 241, 0.6) 0%, transparent 50%),
          #f4f6f5
        `,
      }}
    >
      {/* Background Decorative Floral/Abstract Elements representing wellness shapes */}
      <div
        className="position-absolute opacity-25 d-none d-lg-block"
        style={{
          top: "15%",
          left: "10%",
          fontSize: "5rem",
          pointerEvents: "none",
        }}
      >
        🌿
      </div>
      <div
        className="position-absolute opacity-25 d-none d-lg-block"
        style={{
          bottom: "15%",
          right: "12%",
          fontSize: "5rem",
          pointerEvents: "none",
        }}
      >
        🌸
      </div>
      <div
        className="position-absolute opacity-10 d-none d-lg-block"
        style={{
          bottom: "20%",
          left: "15%",
          fontSize: "6rem",
          pointerEvents: "none",
        }}
      >
        ✨
      </div>
      <div
        className="position-absolute opacity-15 d-none d-lg-block"
        style={{
          top: "20%",
          right: "15%",
          fontSize: "4rem",
          pointerEvents: "none",
        }}
      >
        🎯
      </div>

      <div className="container position-relative py-5" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-5">
          {/* Left Column: Hero Text Content */}
          <div className="col-12 col-md-7 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
              <span style={{ color: "#ff4081", fontSize: "2.5rem" }}>♥️</span>
              <h1
                className="display-3 fw-bold m-0"
                style={{ color: "#2d3748", letterSpacing: "-1px" }}
              >
                AuraFlow
              </h1>
            </div>

            <h2 className="display-5 fw-semibold mb-4 text-secondary">
              Your wellness, <br className="d-none d-md-block" />
              perfectly synchronized.
            </h2>

            <p
              className="lead mb-5 custom-paragraph"
              style={{ maxWidth: "550px", lineHeight: "1.7", color: "#4a5568" }}
            >
              A secure, intelligent digital health platform designed to track
              your cycles, analyze your symptoms, and bring deep clarity to your
              personal well-being.
            </p>

            {/* Primary Call-to-Action Triggers */}
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start gap-3">
              <button
                onClick={() =>
                  navigate(isAuthenticated ? "/userDashboard" : "/register")
                }
                className="btn fw-bold px-4 py-3 border-0 text-white shadow rounded-pill"
                style={{
                  background:
                    "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
                  fontSize: "1.1rem",
                }}
              >
                {isAuthenticated
                  ? "Enter Workspace Panel →"
                  : "Get Started Free"}
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/login")}
                  className="btn fw-semibold px-4 py-3 rounded-pill bg-white text-dark shadow-sm"
                  style={{
                    fontSize: "1.1rem",
                    border: "1.5px solid rgba(255, 64, 129, 0.4)",
                  }}
                >
                  Sign In to Account
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Matched Geometric Brand Visual Component */}
          <div className="col-12 col-md-5 d-flex justify-content-center">
            <div
              className="position-relative d-flex align-items-center justify-content-center rounded-circle border-0 shadow-lg bg-white"
              style={{
                width: "320px",
                height: "320px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
              }}
            >
              {/* Soft pink glowing center element representing your brand core */}
              <div
                className="position-absolute rounded-circle opacity-20"
                style={{
                  width: "200px",
                  height: "200px",
                  background:
                    "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
                  filter: "blur(45px)",
                }}
              />
              <span className="display-1" style={{ zIndex: 1 }}>
                ✨
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
