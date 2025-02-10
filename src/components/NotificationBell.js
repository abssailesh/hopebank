import { useState, useEffect } from "react";
import axios from "axios";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await axios.get("/api/notifications");
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <button>🔔 {notifications.length}</button>
      <ul>
        {notifications.map((n) => (
          <li key={n._id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationBell;
