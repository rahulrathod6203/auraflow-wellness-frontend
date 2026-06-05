import { useNavigate } from "react-router-dom";
import { getLoggedInUser, isUserLoggedIn, logout } from "../auth/AuthService";

const Header = () => {
  const isAuthenticated = isUserLoggedIn();

  const user = getLoggedInUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Brand/Logo */}
        <a className="navbar-brand fw-bold" href="#">
          <i className="fas fa-bolt me-2 text-warning"></i>❤️ AuraFlow
        </a>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links & Buttons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Side Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Pricing
                  </a>
                </li>
              </>
            )}
          </ul>

          {/* Right Side Auth Buttons */}
          <div className="d-flex gap-2">
            {!isAuthenticated && (
              <>
                <a
                  href="/login"
                  className="btn btn-sm px-3 "
                  style={{ backgroundColor: "#ff4081", color: "#fff" }}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="btn btn-sm px-3"
                  style={{ backgroundColor: "#ff4081", color: "#fff" }}
                >
                  Register
                </a>
              </>
            )}
            {isAuthenticated && (
              <>
                <a
                  className="btn btn-sm px-3"
                  style={{ backgroundColor: "#ff4081", color: "#fff" }}
                >
                  Welcome {user}
                </a>
                <a
                  onClick={handleLogout}
                  className="btn btn-sm px-3"
                  style={{ backgroundColor: "#ff4081", color: "#fff" }}
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
