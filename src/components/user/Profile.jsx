import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();

  // Extract user data from router navigation state (with fallback defaults)
  const initialProfileData = location.state?.user || {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 019-2834",
    password: "", // Initial empty password state for editing
    address: "742 Evergreen Terrace, Springfield",
    roles: ["ADMIN"], // Array structure to safely handle your backend role strings
    joinedDate: "October 2024",
  };

  const [profileData, setProfileData] = useState(initialProfileData);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving updates to AuraFlow backend:", profileData);
  };

  // Safely look inside roles array or fallback to a string check
  const isAdmin =
    profileData.roles?.[0]?.toLowerCase() === "admin" ||
    profileData.role?.toLowerCase() === "admin";

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden py-5"
      style={{
        /* Same exact AuraFlow background composition */
        background: `
          radial-gradient(circle at 10% 20%, rgba(255, 64, 129, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(103, 58, 183, 0.08) 0%, transparent 45%),
          radial-gradient(circle at 50% 0%, rgba(224, 242, 241, 0.6) 0%, transparent 50%),
          #f4f6f5
        `,
      }}
    >
      {/* Background Decorative Shapes matching your platform branding */}
      <div
        className="position-absolute opacity-25 d-none d-lg-block"
        style={{
          top: "15%",
          left: "8%",
          fontSize: "4rem",
          pointerEvents: "none",
        }}
      >
        🌿
      </div>
      <div
        className="position-absolute opacity-25 d-none d-lg-block"
        style={{
          bottom: "15%",
          right: "8%",
          fontSize: "4rem",
          pointerEvents: "none",
        }}
      >
        🌸
      </div>

      <div
        className="container position-relative"
        style={{ zIndex: 1, maxWidth: "850px" }}
      >
        {/* Admin Dashboard Banner - Matching AuraFlow Pink gradient perfectly */}
        {isAdmin && (
          <div
            className="alert d-flex align-items-center justify-content-between p-3 border-0 shadow-sm mb-4 text-white"
            style={{
              background: "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <span className="fs-4">🛡️</span>
              <div>
                <h6 className="fw-bold mb-0">Administrative Portal</h6>
                <small className="opacity-90">
                  You are viewing this profile workspace with global write
                  management privileges.
                </small>
              </div>
            </div>
            <span className="badge bg-white text-dark text-uppercase px-2 py-1">
              System Admin
            </span>
          </div>
        )}

        {/* Profile Card Interface */}
        <div className="row g-4">
          {/* Left Summary Block */}
          <div className="col-12 col-lg-4">
            <div
              className="card border-0 shadow-sm text-center p-3 h-100"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                {/* Glowing Initials Graphic */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mb-3 shadow"
                  style={{
                    width: "80px",
                    height: "80px",
                    fontSize: "2rem",
                    background:
                      "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
                  }}
                >
                  {profileData.name
                    ? profileData.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <h5 className="fw-bold mb-1" style={{ color: "#2d3748" }}>
                  {profileData.name || "Aura Member"}
                </h5>
                <p className="text-muted small mb-3">{profileData.email}</p>

                {/* Account Type Badge */}
                <span
                  className="badge px-3 py-2 text-uppercase mb-2 text-white shadow-sm"
                  style={{ background: "#ff4081" }}
                >
                  {isAdmin ? "Admin" : "User"} Account
                </span>

                {profileData.joinedDate && (
                  <small className="text-muted blockquote-footer mt-2">
                    Joined {profileData.joinedDate}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* Right Input Form Block */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-lg p-4 bg-white">
              <div className="card-body">
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span style={{ color: "#ff4081", fontSize: "1.25rem" }}>
                      ♥️
                    </span>
                    <h4 className="fw-bold m-0" style={{ color: "#2d3748" }}>
                      {isAdmin ? "Admin Settings" : "Account Settings"}
                    </h4>
                  </div>
                  <p className="text-muted small">
                    Update your workspace details and personal contact channels.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Grid Row 1: Full Name & Email */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="nameInput"
                          className="form-label small fw-semibold"
                          style={{ color: "#4a5568" }}
                        >
                          Full Name
                        </label>
                        <input
                          required
                          id="nameInput"
                          type="text"
                          name="name"
                          value={profileData.name || ""}
                          onChange={handleChange}
                          className="form-control border-0 py-2 shadow-sm"
                          style={{ backgroundColor: "#f4f6f5" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="emailInput"
                          className="form-label small fw-semibold"
                          style={{ color: "#4a5568" }}
                        >
                          Email Address
                        </label>
                        <input
                          required
                          id="emailInput"
                          type="email"
                          name="email"
                          value={profileData.email || ""}
                          onChange={handleChange}
                          className="form-control border-0 py-2 shadow-sm"
                          style={{ backgroundColor: "#f4f6f5" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Grid Row 2: Phone & Password */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="phoneInput"
                          className="form-label small fw-semibold"
                          style={{ color: "#4a5568" }}
                        >
                          Phone Number
                        </label>
                        <input
                          required
                          id="phoneInput"
                          type="tel"
                          name="phone"
                          value={profileData.phone || ""}
                          onChange={handleChange}
                          className="form-control border-0 py-2 shadow-sm"
                          style={{ backgroundColor: "#f4f6f5" }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="passwordInput"
                          className="form-label small fw-semibold"
                          style={{ color: "#4a5568" }}
                        >
                          Change Password
                        </label>
                        <input
                          id="passwordInput"
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={profileData.password || ""}
                          onChange={handleChange}
                          className="form-control border-0 py-2 shadow-sm"
                          style={{ backgroundColor: "#f4f6f5" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Grid Row 3: Address */}
                  <div className="form-group mb-4">
                    <label
                      htmlFor="addressInput"
                      className="form-label small fw-semibold"
                      style={{ color: "#4a5568" }}
                    >
                      Street Address
                    </label>
                    <textarea
                      required
                      id="addressInput"
                      rows={2}
                      name="address"
                      value={profileData.address || ""}
                      onChange={handleChange}
                      className="form-control border-0 py-2 shadow-sm"
                      style={{ backgroundColor: "#f4f6f5", resize: "none" }}
                    />
                  </div>

                  {/* Footer Controls */}
                  <div className="d-flex gap-2 justify-content-end pt-3 border-top border-light">
                    <button
                      type="button"
                      className="btn fw-semibold px-4 py-2 rounded-pill bg-white text-dark shadow-sm"
                      style={{ border: "1.5px solid rgba(255, 64, 129, 0.2)" }}
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="btn fw-bold px-4 py-2 border-0 text-white shadow rounded-pill"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
                      }}
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
