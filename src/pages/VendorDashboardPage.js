import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Table, Button, Badge } from "react-bootstrap";
import DownloadReport from "../components/DownloadReport"; // ✅ Import the report download component

const VendorDashboardPage = () => {
  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: disputesData } = await axios.get("/api/vendors/disputes");
        setDisputes(disputesData);
      } catch (error) {
        console.error("Error fetching vendor disputes", error);
      }
    };
    fetchData();
  }, []);

  // Function to resolve a dispute
  const resolveDispute = async (disputeId) => {
    try {
      await axios.put(`/api/vendors/disputes/${disputeId}/resolve`);
      setDisputes((prevDisputes) =>
        prevDisputes.map((dispute) =>
          dispute._id === disputeId ? { ...dispute, status: "resolved" } : dispute
        )
      );
    } catch (error) {
      console.error("Error resolving dispute", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">Vendor Dashboard</h2>

        {/* ✅ Add Download Report Feature */}
        <div className="text-center mb-3">
          <DownloadReport reportType="vendor" />
        </div>

        <h3 className="mt-4">Disputes Raised</h3>

        {/* Dispute Table */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {disputes.length > 0 ? (
              disputes.map((dispute) => (
                <tr key={dispute._id}>
                  <td>{dispute.reason}</td>
                  <td>
                    <Badge bg={dispute.status === "resolved" ? "success" : "warning"}>
                      {dispute.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td>
                    {dispute.status !== "resolved" && (
                      <Button variant="primary" size="sm" onClick={() => resolveDispute(dispute._id)}>
                        Resolve Dispute
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No disputes found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default VendorDashboardPage;
