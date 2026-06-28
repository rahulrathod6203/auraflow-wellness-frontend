import React, { useEffect, useState } from "react";
import { getAllUsers } from "../user/UserService";
import { isUserLoggedIn } from "../auth/AuthService";
import "./UserList.css"; // Externalized styling rules
import Profile from "../user/Profile";
import RegisterPage from "../auth/RegisterPage";
import UserUpdateCard from "../user/UserUpdateCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const isAuthenticated = isUserLoggedIn();

  // Simple Pagination States
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for Spring Boot
  const [isLastPage, setIsLastPage] = useState(false);
  const pageSize = 10;

  const updateUser = (id) => {
    // updating user by id
    console.log("User id is: " + id);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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
  }, [isAuthenticated, currentPage]);

  return (
    <div className="userlist-wrapper bg-light min-vh-100 py-5">
      <div className="container userlist-container">
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
        <div className="userlist-card card border-0 shadow-sm overflow-hidden mb-3">
          <div className="table-responsive">
            <table className="userlist-table table table-hover align-middle mb-0 bg-white">
              <thead className="userlist-thead table-dark">
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
                      <td className="userlist-address text-secondary text-truncate">
                        {user.address || "—"}
                      </td>
                      <td>
                        <span className="userlist-role-badge badge bg-light text-dark border rounded-1 text-uppercase fw-bold">
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
                            className="btn btn-sm btn-outline-dark fw-medium userlist-action-btn"
                            onClick={() => updateUser(user.id)}
                          >
                            Update
                          </button>
                          <button className="btn btn-sm btn-outline-danger fw-medium userlist-action-btn">
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
              className="btn btn-sm btn-outline-dark px-3 fw-medium userlist-page-btn"
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-sm btn-outline-dark px-3 fw-medium userlist-page-btn"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={isLastPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* model */}

      {/* Modal Trigger Button */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        Open modal
      </button>

      {/* Modal Structure */}
      <div className="modal fade" id="myModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Modal Heading</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <UserUpdateCard />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* model end */}
    </div>
  );
};

export default UserList;
