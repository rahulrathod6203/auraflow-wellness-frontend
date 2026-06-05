import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout & Section Views
import Header from "./components/homepage/Header";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/homepage/Footer";

// Authentication Views
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import UserDashboard from "./components/user/UserDashboard";
import { isUserLoggedIn } from "./components/auth/AuthService";

const App = () => {
  // Simple best-practice guard component for routing
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/login" replace />; // 'replace' prevents loop history stacking
  }

  return (
    <Router>
      {/* Globally displayed elements */}
      <Header />

      {/* Route Switch Matrix */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* FIX: Keep the Route component as a direct child of Routes, and wrap the element inside it instead */}
        <Route
          path="/userDashboard"
          element={
            <AuthenticatedRoute>
              <UserDashboard />
            </AuthenticatedRoute>
          }
        />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
};

export default App;
