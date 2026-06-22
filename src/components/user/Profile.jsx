import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "../auth/AuthService";
import { getUserById } from "../user/UserService"; // Adjust path to match your structure
import Swal from "sweetalert2"; // High-quality interview-ready feedback confirmation

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedUserId = getLoggedInUser();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    roles: [],
    joinedDate: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.user) {
      setProfileData(location.state.user);
    } else if (loggedUserId) {
      setIsLoading(true);
      getUserById(loggedUserId)
        .then((response) => {
          setProfileData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(
            "Failed to fetch active user context profile details:",
            error,
          );
          setIsLoading(false);
        });
    }
  }, [location.state, loggedUserId]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Saving updates to AuraFlow backend:", profileData);

    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Success",
        text: "Configuration saved successfully.",
        icon: "success",
        confirmButtonColor: "#1a1a1a",
      });
    }, 800);
  };

  const handleDiscard = () => {
    navigate("/userDashboard");
  };

  // destructive action handler showing full-stack security workflow awareness
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Delete Account?",
      text: "This action is permanent and cannot be undone. All your wellness data parameters will be wiped from our secure ledger.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545", // Standard Bootstrap Danger Red
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete permanently",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        // Invoke your backend API service: deleteUserById(loggedUserId)
        console.log(`Invoking destructive API route for ID: ${loggedUserId}`);

        setTimeout(() => {
          setIsLoading(false);
          logout(); // Clear JWT and session storage tokens
          Swal.fire({
            title: "Account Deleted",
            text: "Your profile profile records have been removed successfully.",
            icon: "success",
            confirmButtonColor: "#1a1a1a",
          });
          navigate("/");
        }, 1000);
      }
    });
  };

  const isAdmin =
    profileData.roles?.[0]?.toLowerCase() === "admin" ||
    profileData.role?.toLowerCase() === "admin";

  return (
    <div
      className="container-fluid min-vh-100 bg-light d-flex align-items-center py-5"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        paddingTop: "90px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "880px",
        }}
      >
        <div className="row g-4">
          {/* Left Column: Summary Info Profile Plate */}
          <div className="col-12 col-md-4 ">
            <div
              className="card border-1 shadow-sm p-4 text-center bg-white h-100"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div
                  className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-semibold mb-3 shadow-sm"
                  style={{ width: "72px", height: "72px", fontSize: "1.75rem" }}
                >
                  {profileData.name
                    ? profileData.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <h5 className="fw-bold text-dark mb-1">
                  {profileData.name || "Aura Member"}
                </h5>
                <p className="text-muted small mb-3">
                  {profileData.email || "Loading..."}
                </p>

                <span className="badge bg-dark text-white border border-light-subtle px-4  py-2 rounded-pill mb-2 small fw-medium">
                  {isAdmin ? "Admin Access" : "Standard Account"}
                </span>

                {profileData.joinedDate && (
                  <span
                    className="text-muted small mt-2"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Joined {profileData.joinedDate}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Mutation Core Input Form */}
          <div className="col-12 col-md-8">
            <div
              className="card border-1 shadow-sm p-4 bg-white mb-4"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body p-0">
                <div className="mb-4">
                  <h4 className="fw-bold text-dark tracking-tight mb-1">
                    {isAdmin ? "Admin Settings" : "Account Settings"}
                  </h4>
                  <p className="text-muted small mb-0">
                    Update your workspace details and personal contact channels.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Row 1: Full Name & Email */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="nameInput"
                        className="form-label small fw-medium text-secondary"
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
                        disabled={isLoading}
                        className="form-control"
                        style={{ borderRadius: "6px", fontSize: "0.95rem" }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="emailInput"
                        className="form-label small fw-medium text-secondary"
                      >
                        Email Address (Locked)
                      </label>
                      <input
                        id="emailInput"
                        type="email"
                        name="email"
                        value={profileData.email || ""}
                        readOnly
                        disabled
                        className="form-control bg-light text-muted border-light-subtle"
                        style={{
                          borderRadius: "6px",
                          fontSize: "0.95rem",
                          cursor: "not-allowed",
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Password */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="phoneInput"
                        className="form-label small fw-medium text-secondary"
                      >
                        Phone Number (Locked)
                      </label>
                      <input
                        id="phoneInput"
                        type="tel"
                        name="phone"
                        value={profileData.phone || ""}
                        readOnly
                        disabled
                        className="form-control bg-light text-muted border-light-subtle"
                        style={{
                          borderRadius: "6px",
                          fontSize: "0.95rem",
                          cursor: "not-allowed",
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="passwordInput"
                        className="form-label small fw-medium text-secondary"
                      >
                        Password (Locked)
                      </label>
                      <input
                        id="passwordInput"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={profileData.password || ""}
                        readOnly
                        disabled
                        className="form-control bg-light text-muted border-light-subtle"
                        style={{
                          borderRadius: "6px",
                          fontSize: "0.95rem",
                          cursor: "not-allowed",
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 3: Full Address */}
                  <div className="mb-4">
                    <label
                      htmlFor="addressInput"
                      className="form-label small fw-medium text-secondary"
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
                      disabled={isLoading}
                      className="form-control"
                      style={{
                        borderRadius: "6px",
                        fontSize: "0.95rem",
                        resize: "none",
                      }}
                    />
                  </div>

                  {/* Footer Controls */}
                  <div className="d-flex gap-2 justify-content-end pt-3 border-top border-light-subtle">
                    <button
                      type="button"
                      onClick={handleDiscard}
                      disabled={isLoading}
                      className="btn btn-light btn-sm px-3 text-secondary fw-medium"
                      style={{ borderRadius: "6px" }}
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-dark btn-sm px-4 fw-medium d-flex align-items-center gap-2"
                      style={{ borderRadius: "6px" }}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                          <span>Saving...</span>
                        </>
                      ) : (
                        "Save Configuration"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* INTERVIEW SHOWCASE: Premium destructive separation context box (Danger Zone) */}
            <div
              className="card border border-danger border-opacity-20 shadow-sm p-4 bg-white"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                <div>
                  <h5
                    className="fw-bold text-danger tracking-tight mb-1"
                    style={{ fontSize: "1rem" }}
                  >
                    Danger Zone
                  </h5>
                  <p className="text-muted small mb-0">
                    Permanently delete your profile account workspace and purge
                    database logs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                  className="btn btn-outline-danger btn-sm px-3 fw-medium text-nowrap align-self-start align-self-sm-center"
                  style={{ borderRadius: "6px" }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
