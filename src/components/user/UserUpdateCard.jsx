import React from "react";
import "./UserUpdateCard.css"; // Keep your input/card styles scoped here

const UserUpdateCard = ({
  userData = {},
  setUserData,
  fieldErrors,
  setFieldErrors,
  isLoading,
  onSubmit,
  successMessage,
  errorMessage,
}) => {
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    if (fieldErrors?.[e.target.id]) {
      setFieldErrors({ ...fieldErrors, [e.target.id]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <div className="card user-update-card border-0 shadow-sm p-4">
      {/* Feedback Banners */}
      {successMessage && (
        <div
          className="alert alert-success border-0 small text-center mb-3 py-2"
          role="alert"
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="alert alert-danger border-0 small text-center mb-3 py-2"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Row 1: Name and Email */}
        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <label
              htmlFor="name"
              className="form-label small fw-medium text-secondary"
            >
              Full Name
            </label>
            <input
              required
              type="text"
              id="name"
              className={`form-control ${fieldErrors?.name ? "is-invalid" : ""}`}
              value={userData.name || ""}
              onChange={handleChange}
              disabled={isLoading}
            />
            {fieldErrors?.name && (
              <div className="invalid-feedback small mt-1">
                {fieldErrors.name}
              </div>
            )}
          </div>

          <div className="col-12 col-sm-6">
            <label
              htmlFor="email"
              className="form-label small fw-medium text-secondary"
            >
              Email address
            </label>
            <input
              required
              type="email"
              id="email"
              className={`form-control ${fieldErrors?.email ? "is-invalid" : ""}`}
              value={userData.email || ""}
              onChange={handleChange}
              disabled={isLoading}
            />
            {fieldErrors?.email && (
              <div className="invalid-feedback small mt-1">
                {fieldErrors.email}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Phone and Address */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6">
            <label
              htmlFor="phone"
              className="form-label small fw-medium text-secondary"
            >
              Phone Number
            </label>
            <input
              required
              type="tel"
              id="phone"
              className={`form-control ${fieldErrors?.phone ? "is-invalid" : ""}`}
              value={userData.phone || ""}
              onChange={handleChange}
              disabled={isLoading}
            />
            {fieldErrors?.phone && (
              <div className="invalid-feedback small mt-1">
                {fieldErrors.phone}
              </div>
            )}
          </div>

          <div className="col-12 col-sm-6">
            <label
              htmlFor="address"
              className="form-label small fw-medium text-secondary"
            >
              Address
            </label>
            <input
              required
              type="text"
              id="address"
              className={`form-control ${fieldErrors?.address ? "is-invalid" : ""}`}
              value={userData.address || ""}
              onChange={handleChange}
              disabled={isLoading}
            />
            {fieldErrors?.address && (
              <div className="invalid-feedback small mt-1">
                {fieldErrors.address}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-dark w-100 py-2"
        >
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span>Updating Account...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserUpdateCard;
