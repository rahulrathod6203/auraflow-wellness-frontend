import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getLoggedInUser } from "../auth/AuthService";
import { getUserById } from "./UserService";
import "./UserDashboard.css"; // Externalized layout rules

const UserDashboard = () => {
  const navigate = useNavigate();
  const loggedUserId = getLoggedInUser();
  const [userData, setUserData] = useState({});
  const [greeting, setGreeting] = useState("Welcome");
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

  const isAdmin =
    userData.roles?.[0]?.toLowerCase() === "admin" ||
    userData.role?.toLowerCase() === "admin";

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
    <div className="dashboard-wrapper bg-light min-vh-100 py-4 position-relative">
      <div className="container dashboard-container">
        {/* ROW 1: PREMIUM HERO WELCOME BANNER */}
        <div className="dashboard-hero row mb-4 rounded-3 p-4 p-md-5 text-white shadow-sm align-items-center mx-0">
          <div className="col-md-8 text-center text-md-start p-0">
            <span className="badge bg-white text-dark mb-3 px-2.5 py-1.5 rounded-1 fw-bold tracking-wider small text-uppercase">
              🇮🇳 Indian Standard Time (IST)
            </span>
            <h1 className="dashboard-greeting display-5 fw-bold mb-2 tracking-tight">
              {greeting}, {userData.name?.trim().split(" ")[0] || "User"}!
            </h1>
            <p className="text-white-50 lead fs-6 mb-0">
              Welcome back to your Aura wellness space. Everything is perfectly
              synchronized.
            </p>
          </div>
          <div className="col-md-4 text-center text-md-end mt-3 mt-md-0 p-0">
            <div className="dashboard-timeout-badge bg-white bg-opacity-10 rounded-2 p-2 px-3 d-inline-block border border-white border-opacity-10">
              <div className="small text-dark-50 fw-medium">
                Session timeout in : 00:00 minutes
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: METRIC OVERVIEW CARDS */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="dashboard-metric-card card h-100 border-0 shadow-sm p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="dashboard-metric-label text-secondary small fw-medium text-uppercase tracking-wider">
                  Profile Status
                </span>
                <span className="badge bg-success-subtle text-success rounded-1 small fw-bold px-2 py-1">
                  Active
                </span>
              </div>
              <h4 className="fw-bold m-0 text-dark tracking-tight">Verified</h4>
              <p className="dashboard-metric-desc text-muted small m-0 mt-1">
                Secured via Aura Auth
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className="dashboard-metric-card card h-100 border-0 shadow-sm p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="dashboard-metric-label text-secondary small fw-medium text-uppercase tracking-wider">
                  Wellness Cycle
                </span>
                <span className="text-dark fw-bold small">01 / Index</span>
              </div>
              <h4 className="fw-bold m-0 text-dark tracking-tight">Day 14</h4>
              <p className="dashboard-metric-desc text-muted small m-0 mt-1">
                Perfectly on track
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className="dashboard-metric-card card h-100 border-0 shadow-sm p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="dashboard-metric-label text-secondary small fw-medium text-uppercase tracking-wider">
                  Logged Symptoms
                </span>
                <span className="text-dark fw-bold small">02 / Diagnostic</span>
              </div>
              <h4 className="fw-bold m-0 text-dark tracking-tight">0 Active</h4>
              <p className="dashboard-metric-desc text-muted small m-0 mt-1">
                No anomalies flagged
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className="dashboard-metric-card card h-100 border-0 shadow-sm p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="dashboard-metric-label text-secondary small fw-medium text-uppercase tracking-wider">
                  Member Since
                </span>
                <span className="text-dark fw-bold small">03 / Ledger</span>
              </div>
              <h4 className="fw-bold m-0 text-dark tracking-tight">
                {userData.createdAt?.trim().split(" ")[0] || "Active"}
              </h4>
              <p className="dashboard-metric-desc text-muted small m-0 mt-1">
                Premium Tier Account
              </p>
            </div>
          </div>
        </div>

        {/* ROW 3: SYSTEM WORKSPACE LAYOUT */}
        <div className="row g-4">
          {/* Diagnostic Display Panel */}
          <div className="col-md-8">
            <div className="dashboard-panel-card card border-0 shadow-sm p-4 h-100">
              <h5 className="fw-bold text-dark tracking-tight mb-3">
                Your Wellness Insights
              </h5>
              <div className="dashboard-empty-state p-5 text-center border border-secondary border-opacity-10 border-dashed bg-light">
                <span className="dashboard-empty-title text-secondary fw-semibold d-block mb-2">
                  No recent metrics recorded today
                </span>
                <p className="dashboard-empty-text text-muted small mx-auto mb-4">
                  Start tracking your data parameters or symptoms to populate
                  your diagnostic charts.
                </p>
                <button className="btn btn-dark btn-sm px-4 py-2 fw-medium dashboard-action-btn">
                  + Log Today's Metrics
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Control Block */}
          <div className="col-md-4">
            <div className="dashboard-panel-card card border-0 shadow-sm p-4 h-100">
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
                  to="#"
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between small text-secondary py-2.5 fw-medium"
                >
                  <span>Security & Privacy</span>
                  <span className="text-muted small">→</span>
                </Link>
                {/* <Link
                  to="/contact"
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between small text-secondary py-2.5 fw-medium"
                >
                  <span>Contact Support Team</span>
                  <span className="text-muted small">→</span>
                </Link> */}
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between small text-secondary py-2.5 fw-medium text-start bg-transparent"
                >
                  <span>Chat with AuraAI</span>
                  <span className="text-muted small">→</span>
                </button>
                {isAdmin && (
                  <Link
                    to="/userList"
                    className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between small text-secondary py-2.5 fw-medium"
                  >
                    <span>Registered Users</span>
                    <span className="text-muted small">→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FLOATING CHATBOT ICON & WINDOW ================= */}
      <div className="dashboard-chat-wrapper position-fixed bottom-0 end-0 m-4 d-flex align-items-center gap-3">
        {chatOpen && (
          <div className="dashboard-chat-box card border-0 shadow-lg bg-dark text-start d-flex flex-column overflow-hidden position-absolute">
            {/* Header Plate */}
            <div className="p-3 bg-dark text-white d-flex align-items-center justify-content-between">
              <div className="fw-bold small d-flex align-items-center gap-2">
                <span>🤖</span> AuraAI System Panel
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="btn btn-sm text-white-50 p-0 border-0 dashboard-chat-close"
              >
                &times;
              </button>
            </div>

            {/* Chat History Flow Area */}
            <div className="p-3 flex-grow-1 overflow-y-auto bg-light dashboard-chat-body">
              <div className="dashboard-chat-bubble bg-dark p-3 mb-2 rounded shadow-sm text-white border-1 border-dark-subtle">
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
                className="form-control form-control-sm bg-light border-1 px-2 dashboard-chat-input"
              />
              <button className="btn btn-dark btn-sm px-3 fw-medium dashboard-chat-send">
                Send
              </button>
            </div>
          </div>
        )}

        <span className="text-secondary small fw-medium px-1">
          Chat with AuraAI
        </span>

        {/* Floating Bubble Button Trigger */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="dashboard-chat-toggle btn btn-dark rounded-pill shadow-lg p-0 d-flex align-items-center justify-content-center border border-secondary border-opacity-25"
          title="Chat with AuraAI"
        >
          <span className="dashboard-chat-icon">🤖</span>
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
