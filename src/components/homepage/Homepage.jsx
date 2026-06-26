import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../auth/AuthService";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = isUserLoggedIn();

  const [page, setPage] = useState("register");

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-sm-6" style={{ paddingTop: "200px" }}>
            <h1 className="display-4 fw-bold mb-3">
              Your wellness, perfectly synchronized.
            </h1>

            {/* Basic Description */}
            <p
              className="lead text-muted mx-auto mb-4"
              style={{ maxWidth: "600px" }}
            >
              A secure, intelligent digital health platform designed to track
              your cycles, analyze symptoms, and bring metric-driven clarity to
              your personal well-being.
            </p>

            <button
              onClick={() => navigate(isAuthenticated ? "/userDashboard" : "/")}
              className="btn btn-dark btn-lg mx-1"
            >
              {isAuthenticated ? "Enter Workspace Panel →" : "Get Started Free"}
            </button>

            {/* CONCEPT 2: Conditional rendering - Hide sign-in if token is active */}
            {!isAuthenticated && (
              <button
                onClick={() => navigate("/login")}
                className="btn btn-outline-secondary btn-lg"
              >
                Sign In to Account
              </button>
            )}
          </div>
          <div className="col-sm-6">
            {page === "register" ? <RegisterPage /> : <LoginPage />}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
