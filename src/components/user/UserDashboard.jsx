import React, { useState, useEffect } from "react";
import { getLoggedInUser, logout } from "../auth/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { getUserById } from "./UserService";

const UserDashboard = () => {
  const navigate = useNavigate();
  const loggedUserId = getLoggedInUser();
  const [userData, setUserData] = useState({});
  const [greeting, setGreeting] = useState("Welcome");

  // State to handle the live chat popup toggle
  const [chatOpen, setChatOpen] = useState(false);

  // 1. Fetch User Data Profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(loggedUserId);
        setUserData(fetchedUser.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (loggedUserId) {
      fetchUser();
    }
  }, [loggedUserId]);

  // 2. Dynamic Time-of-Day Greeting (IST Based)
  useEffect(() => {
    const istString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const istDate = new Date(istString);
    const hours = istDate.getHours();

    if (hours >= 4 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good Afternoon");
    } else if (hours >= 17 && hours < 22) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  return (
    <div
      className="bg-light min-vh-100 py-4 position-relative"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="container" style={{ paddingTop: "80px" }}>
        {/* ROW 1: PREMIUM HERO WELCOME BANNER */}
        <div
          className="row mb-4 rounded-3 p-4 p-md-5 text-white shadow-sm align-items-center mx-0"
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="col-md-8 text-center text-md-start p-0">
            <span className="badge bg-white text-dark mb-3 px-2.5 py-1.5 rounded-1 fw-bold tracking-wider small text-uppercase">
              🇮🇳 Indian Standard Time (IST)
            </span>
            <h1
              className="display-5 fw-bold mb-2 tracking-tight"
              style={{ letterSpacing: "-1px" }}
            >
              {greeting}, {userData.name?.trim().split(" ")[0] || "User"}!
            </h1>
            <p className="text-white-50 lead fs-6 mb-0">
              Welcome back to your Aura wellness space. Everything is perfectly
              synchronized.
            </p>
          </div>
          <div className="col-md-4 text-center text-md-end mt-3 mt-md-0 p-0">
            <div className="bg-white bg-opacity-10 rounded-2 p-2 px-3 d-inline-block border border-white border-opacity-10">
              <div className="small text-dark-50 fw-medium">
                Session Status: Secure Link
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: METRIC OVERVIEW CARDS */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-md-3">
            <div
              className="card h-100 border-0 shadow-sm p-3"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span
                  className="text-secondary small fw-medium text-uppercase tracking-wider"
                  style={{ fontSize: "0.75rem" }}
                >
                  Profile Status
                </span>
                <span className="badge bg-success-subtle text-success rounded-1 small fw-bold px-2 py-1">
                  Active
                </span>
              </div>
              <h4 className="fw-bold m-0 text-dark tracking-tight">Verified</h4>
              <p
                className="text-muted small m-0 mt-1"
                style={{ fontSize: "0.85rem" }}
              >
                Secured via Aura Auth
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div
              className="card h-100 border-0 shadow-sm p-3"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span
                  className="text-secondary small fw-medium text-uppercase tracking-wider"
                  style={{ fontSize: "0.75rem" }}
                >
                  Wellness Cycle
                </span>
                <span className="text-dark fw-bold small">01 / Index</span>
              </div>
              <h4 className="fw-bold m-0 text-dark tracking-tight">Day 14</h4>
              <p
                className="text-muted small m-0 mt-1"
                style={{ fontSize: "0.85rem" }}
              >
                Perfectly on track
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div
              className="card h-100 border-0 shadow-sm p-3"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span
                  className="text-secondary small fw-medium text-uppercase tracking-wider"
                  style={{ fontSize: "0.75rem" }}
                >
                  Logged Symptoms
                </span>
                <span className="text-dark fw-bold small">02 / Diagnostic</span>
              </div>
              <h4 className="fw-bold m-0 text-dark tracking-tight">0 Active</h4>
              <p
                className="text-muted small m-0 mt-1"
                style={{ fontSize: "0.85rem" }}
              >
                No anomalies flagged
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div
              className="card h-100 border-0 shadow-sm p-3"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span
                  className="text-secondary small fw-medium text-uppercase tracking-wider"
                  style={{ fontSize: "0.75rem" }}
                >
                  Member Since
                </span>
                <span className="text-dark fw-bold small">03 / Ledger</span>
              </div>
              <h4 className="fw-bold m-0 text-dark tracking-tight">
                {userData.createdAt?.trim().split(" ")[0] || "Active"}
              </h4>
              <p
                className="text-muted small m-0 mt-1"
                style={{ fontSize: "0.85rem" }}
              >
                Premium Tier Account
              </p>
            </div>
          </div>
        </div>

        {/* ROW 3: SYSTEM WORKSPACE LAYOUT */}
        <div className="row g-4">
          {/* Diagnostic Display Panel */}
          <div className="col-md-8">
            <div
              className="card border-0 shadow-sm p-4 h-100"
              style={{ borderRadius: "12px" }}
            >
              <h5 className="fw-bold text-dark tracking-tight mb-3">
                Your Wellness Insights
              </h5>
              <div
                className="p-5 text-center border border-secondary border-opacity-10 border-dashed bg-light"
                style={{ borderRadius: "8px" }}
              >
                <span
                  className="text-secondary fw-semibold d-block mb-2"
                  style={{ fontSize: "1.1rem" }}
                >
                  No recent metrics recorded today
                </span>
                <p
                  className="text-muted small mx-auto mb-4"
                  style={{ maxWidth: "340px", fontSize: "0.88rem" }}
                >
                  Start tracking your data parameters or symptoms to populate
                  your diagnostic charts.
                </p>
                <button
                  className="btn btn-dark btn-sm px-4 py-2 fw-medium"
                  style={{ borderRadius: "6px" }}
                >
                  + Log Today's Metrics
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Control Block */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow-sm p-4 h-100"
              style={{ borderRadius: "12px" }}
            >
              <h5 className="fw-bold text-dark tracking-tight mb-3">
                Quick Actions
              </h5>
              <div className="list-group list-group-flush">
                <Link
                  to="/profile"
                  state={{ user: userData }}
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between small text-secondary py-2.5 fw-medium"
                >
                  <span>Account Settings</span>
                  <span className="text-muted small">→</span>
                </Link>
                <Link
                  to="/privacy"
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between small text-secondary py-2.5 fw-medium"
                >
                  <span>Security & Privacy</span>
                  <span className="text-muted small">→</span>
                </Link>
                <Link
                  to="/contact"
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between small text-secondary py-2.5 fw-medium"
                >
                  <span>Contact Support Team</span>
                  <span className="text-muted small">→</span>
                </Link>
                {/* Modified to trigger the local popup modal instantly */}
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between small text-secondary py-2.5 fw-medium text-start bg-transparent"
                >
                  <span>Chat with AuraAI</span>
                  <span className="text-muted small">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FLOATING DYNAMIC CHAT POPUP WIDGET ================= */}
      <div
        className="position-fixed bottom-0 end-0 m-4 d-flex flex-column align-items-end"
        style={{ zIndex: 1050 }}
      >
        {/* Dynamic Logged-in Chat Container Box */}
        {chatOpen && (
          <div
            className="card border-0 shadow-lg bg-white mb-3 text-start d-flex flex-column overflow-hidden"
            style={{ width: "340px", height: "400px", borderRadius: "12px" }}
          >
            {/* Header Plate */}
            <div className="p-3 bg-dark text-white d-flex align-items-center justify-content-between">
              <div className="fw-bold small d-flex align-items-center gap-2">
                <span>🤖</span> AuraAI System Panel
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="btn btn-sm text-white-50 p-0 border-0"
                style={{ fontSize: "1rem", lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            {/* Chat History Flow Area */}
            <div
              className="p-3 flex-grow-1 overflow-y-auto bg-light"
              style={{ fontSize: "0.85rem" }}
            >
              <div
                className="bg-white p-2.5 mb-2 rounded shadow-sm text-secondary border border-light-subtle"
                style={{ maxWidth: "85%" }}
              >
                Hello {userData.name?.trim().split(" ")[0] || "User"}! I am
                synced to your profile metrics. Ask me anything about your
                parameters or logs.
              </div>
            </div>

            {/* Simulated Input Toolbar */}
            <div className="p-2 bg-white border-top border-light-subtle d-flex gap-2">
              <input
                type="text"
                placeholder="Ask AuraAI..."
                className="form-control form-control-sm bg-light border-0 px-2"
                style={{ borderRadius: "6px", fontSize: "0.85rem" }}
              />
              <button
                className="btn btn-dark btn-sm px-3 fw-medium"
                style={{ borderRadius: "6px", fontSize: "0.85rem" }}
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Floating Bubble Button Trigger */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="btn btn-dark rounded-pill shadow-lg p-0 d-flex align-items-center justify-content-center border border-secondary border-opacity-25"
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#1a1a1a",
            transition: "transform 0.2s ease",
          }}
          title="Chat with AuraAI"
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={{ fontSize: "1.5rem" }}>🤖</span>
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
