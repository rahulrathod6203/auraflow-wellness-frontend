import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { getLoggedInUser, isUserLoggedIn, logout } from "../auth/AuthService";
import Swal from "sweetalert2";

const Header = () => {
  const isAuthenticated = isUserLoggedIn();
  const user = getLoggedInUser();
  const navigate = useNavigate();

  const userPhoto = "";

  const userInitial =
    user && typeof user === "string" && isNaN(user)
      ? user.charAt(0).toUpperCase()
      : "U";

  const handleLogout = () => {
    Swal.fire({
      title: "Log out",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#212529",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          confirmButtonColor: "#212529",
        });
        navigate("/");
      }
    });
  };

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-dark border-bottom border-secondary border-opacity-25 shadow-sm py-2.5"
      style={{
        backgroundColor: "#1a1a1a",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div className="container">
        {/* Brand / Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center text-white"
          to="/"
        >
          <span className="text-white me-1" style={{ fontSize: "1.1rem" }}>
            ⬢
          </span>
          AuraFlow
        </Link>

        {/* Responsive Mobile Trigger Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ width: "1.25rem", height: "1.25rem" }}
          ></span>
        </button>

        {/* Navigation Content Matrix Wrapper */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link text-white-50 small fw-medium" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white-50 small fw-medium"
                href="#features"
              >
                Features
              </a>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white-50 small fw-medium"
                to={isAuthenticated ? "/help" : "/contact"}
              >
                {isAuthenticated ? "Need Help?" : "Contact us"}
              </Link>
            </li>
          </ul>

          {/* Authentication Control Block */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0 justify-content-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm btn-link text-white-50 text-decoration-none fw-medium px-3"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm btn-light fw-medium px-3"
                  style={{ borderRadius: "6px" }}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  type="button"
                  className="btn p-0 border-0 d-flex align-items-center dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="userDropdown"
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt="User profile"
                      width="34px"
                      height="34px"
                      className="rounded-circle border border-secondary"
                    />
                  ) : (
                    <div
                      className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center fw-semibold small"
                      style={{
                        width: "34px",
                        height: "34px",
                        fontSize: "0.85rem",
                      }}
                    >
                      {userInitial}
                    </div>
                  )}
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow border border-light-subtle py-1 mt-2"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item small text-secondary py-2"
                      to="/userDashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item small text-secondary py-2"
                      to="/profile"
                    >
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item small text-secondary py-2"
                      to="/privacy"
                    >
                      Security & Privacy
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1 border-light-subtle" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item small text-danger fw-medium py-2"
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
