import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 text-center shadow-lg" style={{ maxWidth: "500px" }}>
        <h1>Welcome</h1>
        <p className="text-muted">
          The Automated Payment Fraud Tracking System helps in fraud detection, dispute resolution, and transaction management.
        </p>

        {/* Buttons for Login & Register */}
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="success" size="lg" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default HomePage;
