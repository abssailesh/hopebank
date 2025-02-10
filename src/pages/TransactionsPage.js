import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Table, Badge } from "react-bootstrap";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get("/api/transactions");
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">Your Transactions</h2>
        <p className="text-center text-muted">View all your past transactions.</p>

        {/* Transactions Table */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Currency</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>${transaction.amount}</td>
                  <td>{transaction.currency}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={transaction.status === "completed" ? "success" : "warning"}>
                      {transaction.status.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default TransactionsPage;
