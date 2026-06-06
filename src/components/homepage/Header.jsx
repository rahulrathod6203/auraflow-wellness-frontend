import React from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, isUserLoggedIn, logout } from "../auth/AuthService";

const Header = () => {
  const isAuthenticated = isUserLoggedIn();
  const user = getLoggedInUser();

  // Set to null or "" to instantly test your monogram letter placeholder fallback!
  const photo =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop";

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-dark border-bottom border-secondary border-opacity-10 py-3"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="container">
        {/* Brand/Logo with exact matching pink heart anchor icon */}
        <a
          className="navbar-brand fw-bold d-flex align-items-center fs-4"
          href="/"
          style={{ letterSpacing: "-0.5px" }}
        >
          <span style={{ color: "#ff4081" }} className="me-2">
            ♥️
          </span>
          AuraFlow
        </a>

        {/* Responsive Mobile Trigger */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content wrapper */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Centralized Navigation links matrix */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-3 text-center">
            <li className="nav-item">
              <a
                className="nav-link text-white opacity-75 custom-nav-link"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white opacity-50 custom-nav-link"
                href="#"
              >
                Features
              </a>
            </li>

            {isAuthenticated ? (
              <li className="nav-item">
                <a
                  className="nav-link text-white opacity-50 custom-nav-link"
                  href="#"
                >
                  Need Help?
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link text-white opacity-50 custom-nav-link"
                  href="/contact"
                >
                  Contact us
                </a>
              </li>
            )}
          </ul>

          {/* User Status Interface Container */}
          <div className="d-flex justify-content-center align-items-center gap-3 mt-3 mt-lg-0">
            {!isAuthenticated ? (
              <>
                <a
                  href="/login"
                  className="btn btn-sm text-white border-0 fw-semibold px-3 py-2 opacity-75"
                  style={{ fontSize: "0.9rem" }}
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="btn btn-sm fw-bold px-4 py-2 rounded-pill shadow-sm text-white"
                  style={{ backgroundColor: "#ff4081", fontSize: "0.9rem" }}
                >
                  Get Started
                </a>
              </>
            ) : (
              <div className="dropdown">
                <button
                  type="button"
                  className="btn p-0 border-0 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt="profile"
                      width="38"
                      height="38"
                      className="rounded-circle border border-secondary border-opacity-50 shadow-sm"
                    />
                  ) : (
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center border border-secondary border-opacity-50 fw-bold shadow-sm"
                      style={{
                        width: "38px",
                        height: "38px",
                        fontSize: "0.95rem",
                        textTransform: "uppercase",
                        background:
                          "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
                      }}
                    >
                      {user ? user.charAt(0) : "U"}
                    </div>
                  )}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow border border-secondary border-opacity-10 py-2 custom-dropdown-animate"
                  style={{
                    background: "white",
                  }}
                >
                  <li>
                    <a
                      className="dropdown-item text-black opacity-75 py-2"
                      href="/userDashboard"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-black opacity-75 py-2"
                      href="/profile"
                    >
                      Profile Settings
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-black opacity-75 py-2"
                      href="/settings"
                    >
                      Preferences
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider border-secondary border-opacity-20" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger fw-semibold py-2"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
