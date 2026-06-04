import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // Toggle this true/false to simulate logged-in vs logged-out states
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    console.log("Clearing token and logging out...");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home on logout
  };

  return (
    <Navbar sticky="top" data-bs-theme="dark" bg="dark" expand="sm" className="border-bottom border-secondary-subtle py-3">
      <Container>
        {/* Brand Logo - Uses navigate to avoid page reload */}
        <Navbar.Brand onClick={() => navigate("/")} className="fw-bold d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
          <span style={{ color: "#ff4081", fontSize: "1.25rem" }}>♥️</span>
          <span style={{ fontSize: "1.55rem" }}>Aura</span>
        </Navbar.Brand>

        {/* Navigation Actions */}
        <Nav className="ms-auto d-flex flex-row align-items-center gap-3">
          {!isAuthenticated ? (
            <>
              {/* Logged Out State: Beautifully matches your HomePage design */}
              <Button onClick={() => navigate("/login")} className="fw-semibold border-0 px-3" style={{ backgroundColor: "#ff4081", color: "#fff" }}>
                Login
              </Button>

              <Button
                onClick={() => navigate("/register")}
                className="fw-semibold border-0 px-3"
                style={{ backgroundColor: "#ff4081", color: "#fff" }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              {/* Logged In State */}
              <Nav.Link onClick={() => navigate("/dashboard")} className="text-white fw-semibold px-2" style={{ cursor: "pointer" }}>
                Dashboard
              </Nav.Link>

              {/* Profile Shortcut */}
              <div
                onClick={() => navigate("/profile")}
                className="rounded-circle d-flex align-items-center justify-content-center bg-secondary fw-bold text-white shadow-sm"
                style={{
                  width: "35px",
                  height: "35px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                U
              </div>

              <Button variant="outline-danger" size="sm" onClick={handleLogout} className="fw-semibold px-3">
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
