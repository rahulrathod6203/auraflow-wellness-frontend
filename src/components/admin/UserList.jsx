import React, { useEffect, useState } from "react";
import { getAllUsers } from "../user/UserService";
import { isUserLoggedIn } from "../auth/AuthService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const isAuthenticated = isUserLoggedIn();

  // Simple Pagination States
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for Spring Boot
  const [isLastPage, setIsLastPage] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Pass page number and size to the API
        const response = await getAllUsers(currentPage, pageSize);
        const dataArray = response.data?.content || response.data || [];

        setUsers([...dataArray]);
        setIsLastPage(response.data?.lastPage ?? false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, currentPage]); // Re-runs when page changes

  return (
    <div
      className="bg-light min-vh-100 py-5"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        paddingTop: "90px",
      }}
    >
      <div className="container" style={{ paddingTop: "40px" }}>
        {/* Header Section */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark tracking-tight mb-1">
            Registered Users
          </h2>
          <p className="text-muted small">
            Global system user registry ledger workspace panel.
          </p>
        </div>

        {/* Full Width Table Container Frame */}
        <div
          className="card border-0 shadow-sm overflow-hidden mb-3"
          style={{ borderRadius: "12px" }}
        >
          <div className="table-responsive">
            <table
              className="table table-hover align-middle mb-0 bg-white"
              style={{ fontSize: "0.9rem" }}
            >
              <thead
                className="table-dark"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <tr>
                  <th className="py-3 ps-3 fw-semibold">ID</th>
                  <th className="py-3 fw-semibold">Name</th>
                  <th className="py-3 fw-semibold">Email</th>
                  <th className="py-3 fw-semibold">Phone Number</th>
                  <th className="py-3 fw-semibold">Address</th>
                  <th className="py-3 fw-semibold">Roles</th>
                  <th className="py-3 fw-semibold">Status</th>
                  <th className="py-3 fw-semibold">Registered Date</th>
                  <th className="py-3 fw-semibold text-center pe-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="ps-3 fw-medium text-secondary">
                        #{user.id}
                      </td>
                      <td className="fw-semibold text-dark">{user.name}</td>
                      <td className="text-secondary">{user.email}</td>
                      <td className="text-secondary">{user.phone || "—"}</td>
                      <td
                        className="text-secondary text-truncate"
                        style={{ maxWidth: "180px" }}
                      >
                        {user.address || "—"}
                      </td>
                      <td>
                        <span
                          className="badge bg-light text-dark border rounded-1 text-uppercase fw-bold"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {user.roles?.[0] || user.role || "USER"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-2.5 py-1 fw-medium ${user.active !== false ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}
                        >
                          {user.active !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-secondary small">
                        {user.createdAt ? user.createdAt.split("T")[0] : "—"}
                      </td>
                      <td className="text-center pe-3">
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-sm btn-outline-dark fw-medium"
                            style={{ borderRadius: "4px" }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger fw-medium"
                            style={{ borderRadius: "4px" }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-5 text-muted small"
                    >
                      No registered system records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Simple Pagination Control Panel */}
        <div className="d-flex justify-content-between align-items-center mt-3 px-1">
          <span className="text-secondary small">
            Viewing page <strong>{currentPage + 1}</strong>
          </span>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-dark px-3 fw-medium"
              style={{ borderRadius: "6px" }}
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-sm btn-outline-dark px-3 fw-medium"
              style={{ borderRadius: "6px" }}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={isLastPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
