import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Card } from "react-bootstrap";
import DownloadReport from "../components/DownloadReport";

const AdminDashboardPage = () => {
  const [disputes, setDisputes] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: disputesData } = await axios.get("/api/disputes");
        const { data: transactionsData } = await axios.get("/api/transactions");
        setDisputes(disputesData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching admin data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2>Admin Dashboard</h2>
        <DownloadReport reportType="admin" />

        <h3 className="mt-4">Disputes</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute) => (
              <tr key={dispute._id}>
                <td>{dispute.reason}</td>
                <td>{dispute.status}</td>
                <td>
                  <Button variant="success" onClick={() => approveDispute(dispute._id)}>Approve</Button>
                  <Button variant="danger" className="ms-2" onClick={() => rejectDispute(dispute._id)}>Reject</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

// Approve dispute function
const approveDispute = async (disputeId) => {
  try {
    await axios.put(`/api/admins/approve-dispute/${disputeId}`);
    alert("Dispute approved successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Error approving dispute", error);
  }
};

// Reject dispute function
const rejectDispute = async (disputeId) => {
  try {
    await axios.put(`/api/admins/reject-dispute/${disputeId}`);
    alert("Dispute rejected!");
    window.location.reload();
  } catch (error) {
    console.error("Error rejecting dispute", error);
  }
};

export default AdminDashboardPage;
