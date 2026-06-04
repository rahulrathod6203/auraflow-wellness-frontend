import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register } from "./AuthService";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = register(formData);
    console.log(response);

    console.log("Sending registration data to Spring Boot backend:", formData);
  };

  return (
    // changed pt-5 to pt-3 and min-vh-100 to vh-100 to strictly lock the screen height
    <div data-bs-theme="dark" className="bg-dark text-white min-vh-100 d-flex align-items-start justify-content-center pt-5">
      <Container className="d-flex justify-content-center pt-5">
        <Card className="p-3 w-100 border-secondary-subtle shadow-lg" style={{ maxWidth: "500px", backgroundColor: "#1e1e1e" }}>
          <Card.Body className="p-2">
            {/* Minimal Brand Logo */}
            <div className="text-center mb-4">
              <h2 className="fw-bold" style={{ color: "#ff4081" }}>
                ♥️ Aura
              </h2>
              <p className="text-muted small">Track your cycles. Understand your body.</p>
            </div>

            <h5 className="fw-bold mb-1">Create Account</h5>
            <p className="text-secondary small mb-3">Please fill in your details to sign up</p>

            <Form onSubmit={handleSubmit}>
              {/* Full Name Input */}
              <Form.Group className="mb-2" controlId="formName">
                <Form.Label className="small text-secondary mb-1" style={{ fontSize: "0.75rem" }}>
                  Full Name
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="py-1"
                  style={{ fontSize: "0.9rem" }}
                />
              </Form.Group>

              {/* Email Address Input */}
              <Form.Group className="mb-2" controlId="formEmail">
                <Form.Label className="small text-secondary mb-1" style={{ fontSize: "0.75rem" }}>
                  Email Address
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-1"
                  style={{ fontSize: "0.9rem" }}
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-2" controlId="formPassword">
                <Form.Label className="small text-secondary mb-1" style={{ fontSize: "0.75rem" }}>
                  Password
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="py-1"
                  style={{ fontSize: "0.9rem" }}
                />
              </Form.Group>

              {/* Phone Number Input */}
              <Form.Group className="mb-2" controlId="formPhone">
                <Form.Label className="small text-secondary mb-1" style={{ fontSize: "0.75rem" }}>
                  Phone Number
                </Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="phone"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-1"
                  style={{ fontSize: "0.9rem" }}
                />
              </Form.Group>

              {/* Address Input */}
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label className="small text-secondary mb-1" style={{ fontSize: "0.75rem" }}>
                  Address
                </Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={1} // Reduced row size to optimize layout height
                  name="address"
                  placeholder="Enter your street address..."
                  value={formData.address}
                  onChange={handleChange}
                  className="py-1"
                  style={{ fontSize: "0.9rem", resize: "none" }}
                />
              </Form.Group>

              {/* Action Button */}
              <Button type="submit" className="w-100 py-2 fw-semibold border-0" style={{ backgroundColor: "#ff4081", color: "#fff" }}>
                Sign Up
              </Button>
            </Form>

            {/* Redirection Link to Login */}
            <div className="text-center mt-3">
              <span className="text-muted small">Already have an account? </span>
              <span
                onClick={() => navigate("/login")}
                className="small fw-semibold text-decoration-none"
                style={{ color: "#ff4081", cursor: "pointer" }}
              >
                Sign in
              </span>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
