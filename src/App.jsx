import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout & Section Views
import Header from "./components/homepage/Header";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/homepage/Footer";

// Authentication Views (Ensure case sensitivity matches your folder names exactly!)
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

const App = () => {
  return (
    <Router>
      {/* Globally displayed elements */}
      <Header />

      {/* Route Switch Matrix */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
};

export default App;
