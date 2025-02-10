import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Table, Button, Badge } from "react-bootstrap";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  // Helper function to get the auth token from localStorage
  const getAuthToken = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.token; // Returns the token if it exists
  };

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = getAuthToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        // If you have set up a proxy in package.json, this path is fine.
        // Otherwise, replace "/api/notifications" with the full URL (e.g., "http://localhost:5000/api/notifications")
        const { data } = await axios.get("/api/notifications", config);
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };
    fetchNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      const token = getAuthToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      // Ensure your backend expects an object with the id (here: { id: <notificationId> })
      await axios.put("/api/notifications/mark-read", { id }, config);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === id ? { ...notif, status: "read" } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">Notifications</h2>

        {/* Notifications Table */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <tr key={notif._id}>
                  <td>{notif.message}</td>
                  <td>
                    <Badge bg={notif.status === "read" ? "success" : "warning"}>
                      {notif.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td>
                    {notif.status !== "read" && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => markAsRead(notif._id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No new notifications
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default NotificationsPage;
