import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (!storedUser) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUserInfo(storedUser);
    }
  }, [navigate]);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">Welcome to Your Dashboard</h2>
        {userInfo && <h4 className="text-center text-muted">Hello, {userInfo.username}!</h4>}
        <p className="text-center">Manage your transactions and disputes easily.</p>

        <Row className="mt-4">
          <Col md={6} className="d-flex justify-content-center">
            <Button variant="primary" size="lg" onClick={() => navigate("/transactions")}>
              View Transactions
            </Button>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <Button variant="danger" size="lg" onClick={() => navigate("/disputes")}>
              Manage Disputes
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DashboardPage;
