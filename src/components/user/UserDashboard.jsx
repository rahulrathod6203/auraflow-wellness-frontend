import React, { useState, useEffect } from "react";
import { getLoggedInUser, logout } from "../auth/AuthService";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import Swal from "sweetalert2";
import { getUserById } from "./UserService";

const UserDashboard = () => {
  const navigate = useNavigate();
  const loggedUserId = getLoggedInUser();
  const [userData, setUserData] = useState({});
  const [greeting, setGreeting] = useState("Welcome");
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 minutes

  // 1. Fetch User Data Profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(loggedUserId);
        setUserData(fetchedUser.data);
        console.log(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (loggedUserId) {
      fetchUser();
    }
  }, [loggedUserId]);

  useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This page is under development ⚠️",
    });
  }, []);

  // 2. Dynamic Time-of-Day Greeting (IST Based)
  useEffect(() => {
    const istString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const istDate = new Date(istString);
    const hours = istDate.getHours();

    if (hours >= 4 && hours < 12) {
      setGreeting("Good Morning 🌅");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good Afternoon ☀️");
    } else if (hours >= 17 && hours < 22) {
      setGreeting("Good Evening 🌆");
    } else {
      setGreeting("Good Night 🌌");
    }
  }, []);

  // // 3. Independent Countdown Clock
  // useEffect(() => {
  //   if (secondsLeft <= 0) {
  //     logout();
  //     navigate("/login");
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     setSecondsLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [secondsLeft, navigate]);

  // // 4. Fire Early Notification Modal at exactly 2 seconds left
  // useEffect(() => {
  //   if (secondsLeft === 2) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Session Timeout",
  //       text: "You are being logged out! Please sign in again.",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });
  //   }
  // }, [secondsLeft]);

  // 5. Fixed Development Maintenance Warning Wrapper

  // // Format Helper: MM:SS
  // const formatTimer = (totalSeconds) => {
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;
  //   return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  // };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container" style={{ paddingTop: "70px" }}>
        {/* ROW 1: HERO WELCOME BANNER */}
        <div
          className="row mb-4 rounded-4 p-4 p-md-5 text-white shadow-sm align-items-center"
          style={{
            background: "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
          }}
        >
          <div className="col-md-8 text-center text-md-start">
            <span className="badge bg-white text-dark mb-2 px-3 py-2 rounded-pill fw-semibold shadow-sm">
              🇮🇳 Indian Standard Time (IST)
            </span>
            <h1 className="display-4 fw-bold mb-2">
              {greeting}, {userData.name?.trim().split(" ")[0] || "User"}!
            </h1>
            <p className="lead opacity-90 mb-0">
              Welcome back to your Aura wellness space. Everything is perfectly
              synchronized.
            </p>
          </div>
          <div
            className="col-md-4 text-center text-md-end mt-4 mt-md-0"
            style={{ color: "black" }}
          >
            <div className="bg-black bg-opacity-20 backdrop-blur rounded-3 p-2 d-inline-block border border-white border-opacity-25 shadow-sm">
              <div className="small tracking-wider opacity-75 text-white mb-1">
                Session Expires in : Set 15 Min timer...
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: OVERVIEW CARDS */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 border-0 shadow-sm p-3 rounded-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small text-uppercase fw-bold">
                  Profile Status
                </span>
                <span
                  className={`badge rounded-pill px-2 ${userData.active ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}
                >
                  {userData.active ? "Active" : "Inactive"}
                </span>
              </div>
              <h4 className="fw-bold m-0 text-dark">Verified</h4>
              <p className="text-muted small m-0 mt-1">Secured via Aura Auth</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 border-0 shadow-sm p-3 rounded-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small text-uppercase fw-bold">
                  Wellness Cycle
                </span>
                <span className="text-primary fs-5">✨</span>
              </div>
              <h4 className="fw-bold m-0 text-dark">Day 14</h4>
              <p className="text-muted small m-0 mt-1">Perfectly on track</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 border-0 shadow-sm p-3 rounded-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small text-uppercase fw-bold">
                  Logged Symptoms
                </span>
                <span className="text-warning fs-5">📋</span>
              </div>
              <h4 className="fw-bold m-0 text-dark">0 Active</h4>
              <p className="text-muted small m-0 mt-1">No anomalies flagged</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 border-0 shadow-sm p-3 rounded-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small text-uppercase fw-bold">
                  Member Since
                </span>
                <span className="text-info fs-5">📅</span>
              </div>
              <h4 className="fw-bold m-0 text-dark">
                {userData.createdAt?.trim().split(" ")[0] || "N/A"}
              </h4>
              <p className="text-muted small m-0 mt-1">Premium Tier Account</p>
            </div>
          </div>
        </div>

        {/* ROW 3: WORKSPACE CONTENT */}
        <div className="row g-4">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm p-4 rounded-3 h-100">
              <h5 className="fw-bold text-dark mb-3">Your Wellness Insights</h5>
              <div className="p-5 text-center border border-dashed rounded-3 bg-light">
                <span className="display-6 text-muted mb-2 d-block">📊</span>
                <h6 className="fw-semibold text-secondary">
                  No recent metrics recorded today
                </h6>
                <p
                  className="text-muted small mx-auto"
                  style={{ maxWidth: "340px" }}
                >
                  Start tracking your data parameters or symptoms to populate
                  your diagnostic charts.
                </p>
                <button
                  className="btn btn-sm btn-primary px-3 rounded-pill"
                  style={{ backgroundColor: "#ff4081", borderColor: "#ff4081" }}
                >
                  + Log Today's Metrics
                </button>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts Side Panel (Now Using React Router Links) */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-3 h-100">
              <h5 className="fw-bold text-dark mb-3">Quick Actions</h5>
              <div className="list-group list-group-flush">
                <Link
                  to="/profile"
                  state={{ user: userData }}
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between"
                >
                  <span>👤 Edit Profile Options</span>
                  <span className="text-muted small">→</span>
                </Link>
                <Link
                  to="/settings"
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between"
                >
                  <span>⚙️ Account Settings</span>
                  <span className="text-muted small">→</span>
                </Link>
                <Link
                  to="/privacy"
                  className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center justify-content-between"
                >
                  <span>🛡️ Security & Privacy</span>
                  <span className="text-muted small">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
