import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Table, Button, Modal, Form } from "react-bootstrap";

const DisputePage = () => {
  const [disputes, setDisputes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDispute, setNewDispute] = useState({ reason: "", details: "" });

  // Fetch disputes from API
  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const { data } = await axios.get("/api/disputes");
        setDisputes(data);
      } catch (error) {
        console.error("Error fetching disputes", error);
      }
    };
    fetchDisputes();
  }, []);

  // Handle dispute form submission
  const handleDisputeSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/disputes", newDispute);
      setDisputes([...disputes, data]); // Update dispute list
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error raising dispute", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">Manage Your Disputes</h2>
        <p className="text-center text-muted">Track and raise disputes easily.</p>

        {/* Dispute Table */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Reason</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {disputes.length > 0 ? (
              disputes.map((dispute) => (
                <tr key={dispute._id}>
                  <td>{dispute.reason}</td>
                  <td>{dispute.details}</td>
                  <td>{dispute.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No disputes found</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Raise Dispute Button */}
        <div className="text-center mt-3">
          <Button variant="danger" size="lg" onClick={() => setShowModal(true)}>
            Raise a Dispute
          </Button>
        </div>
      </Card>

      {/* Dispute Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Raise a New Dispute</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDisputeSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter dispute reason"
                value={newDispute.reason}
                onChange={(e) => setNewDispute({ ...newDispute, reason: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter dispute details"
                value={newDispute.details}
                onChange={(e) => setNewDispute({ ...newDispute, details: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Dispute
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DisputePage;
