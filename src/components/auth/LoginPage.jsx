import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending credentials to Spring Boot backend:", formData);
    // TODO: Add Axios POST request to '/auth/login' here
  };

  return (
    <div data-bs-theme="dark" className="bg-dark text-white min-vh-100 d-flex align-items-start justify-content-center pt-5">
      <Container className="d-flex justify-content-center pt-5">
        <Card className="p-4 w-100 border-secondary-subtle shadow-lg" style={{ maxWidth: "500px", backgroundColor: "#1e1e1e" }}>
          <Card.Body>
            {/* Minimal Brand Logo */}
            <div className="text-center mb-4">
              <h2 className="fw-bold" style={{ color: "#ff4081" }}>
                ♥️ Aura
              </h2>
              <p className="text-muted small">Track your cycles. Understand your body.</p>
            </div>

            <h4 className="fw-bold mb-1">Welcome Back</h4>
            <p className="text-secondary small mb-4">Please enter your account details to sign in</p>

            <Form onSubmit={handleSubmit}>
              {/* Email Address Input */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="small text-secondary">Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-2"
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label className="small text-secondary">Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="py-2"
                />
              </Form.Group>

              {/* Action Button */}
              <Button type="submit" className="w-100 py-2 fw-semibold border-0" style={{ backgroundColor: "#ff4081", color: "#fff" }}>
                Sign In
              </Button>
            </Form>

            {/* Redirection Link to Register */}
            <div className="text-center mt-4">
              <span className="text-muted small">Don't have an account? </span>
              <span
                onClick={() => navigate("/register")}
                className="small fw-semibold text-decoration-none"
                style={{ color: "#ff4081", cursor: "pointer" }}
              >
                Sign up
              </span>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
