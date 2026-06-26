import React from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../auth/AuthService";
import aura from "../../assets/aura.jpg"; // Unified asset import
import "./HomePage.css"; // Externalized style layout

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = isUserLoggedIn();

  return (
    <div
      className="home-wrapper"
      style={{ backgroundImage: `url(${aura})` }} // Dynamically apply unified background
    >
      <div className="container home-container">
        <div className="row w-100 align-items-center">
          {/* Main Hero Content Column */}
          <div className="col-12 col-md-7 text-start">
            <h1 className="display-4 fw-bold text-dark mb-3 home-hero-title">
              Your wellness, <br />
              perfectly synchronized.
            </h1>

            {/* Basic Description */}
            <p className="lead text-secondary mb-4 home-description">
              A secure, intelligent digital health platform designed to track
              your cycles, analyze symptoms, and bring metric-driven clarity to
              your personal well-being.
            </p>

            {/* Core Action Callouts */}
            <div className="d-flex flex-wrap gap-3">
              <button
                onClick={() =>
                  navigate(isAuthenticated ? "/userDashboard" : "/register")
                }
                className="btn btn-dark btn-lg home-btn-primary"
              >
                {isAuthenticated
                  ? "Enter Workspace Panel →"
                  : "Get Started Free"}
              </button>

              {/* Conditional Rendering: Hide sign-in if token is active */}
              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline-dark btn-lg home-btn-secondary"
                >
                  Sign In to Account
                </button>
              )}
            </div>
          </div>

          {/* Empty right column or space placeholder */}
          <div className="col-12 col-md-5"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
