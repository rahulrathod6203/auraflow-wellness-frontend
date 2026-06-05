import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        data-bs-theme="dark"
        className="bg-dark text-white min-vh-100 d-flex align-items-center"
      >
        <div className="container text-center text-md-start py-5">
          <div className="row align-items-center g-5">
            {/* Left Column: Hero Text Content */}
            <div className="col-12 col-md-7">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
                <span style={{ color: "#ff4081", fontSize: "2.5rem" }}>♥️</span>
                <h1
                  className="display-3 fw-bold m-0"
                  style={{ letterSpacing: "-1px" }}
                >
                  Aura
                </h1>
              </div>

              <h2 className="display-5 fw-semibold mb-4 text-white-50">
                Your wellness, <br className="d-none d-md-block" />
                perfectly synchronized.
              </h2>

              <p
                className="lead text-secondary mb-5 custom-paragraph"
                style={{ maxWidth: "550px", lineHeight: "1.7" }}
              >
                A secure, intelligent digital health platform designed to track
                your cycles, analyze your symptoms, and bring deep clarity to
                your personal well-being.
              </p>

              {/* Primary Call-to-Action Triggers */}
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start gap-3">
                <button
                  onClick={() => navigate("/register")}
                  className="btn fw-bold px-4 py-3 border-0"
                  style={{
                    backgroundColor: "#ff4081",
                    color: "#fff",
                    fontSize: "1.1rem",
                  }}
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline-light fw-bold px-4 py-3"
                  style={{ fontSize: "1.1rem" }}
                >
                  Sign In to Account
                </button>
              </div>
            </div>

            {/* Right Column: Clean Geometric Brand Visual Component */}
            <div className="col-12 col-md-5 d-flex justify-content-center">
              <div
                className="position-relative d-flex align-items-center justify-content-center rounded-circle border border-secondary-subtle bg-gradient shadow-lg"
                style={{
                  width: "320px",
                  height: "320px",
                  backgroundColor: "#1e1e1e",
                  boxShadow: "0 0 40px rgba(255, 64, 129, 0.15)",
                }}
              >
                {/* Soft glowing absolute center element representing an 'Aura' */}
                <div
                  className="position-absolute rounded-circle opacity-25"
                  style={{
                    width: "180px",
                    height: "180px",
                    backgroundColor: "#ff4081",
                    filter: "blur(40px)", // Standard CSS filter handles the blur safely
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
    </>
  );
};

export default HomePage;
