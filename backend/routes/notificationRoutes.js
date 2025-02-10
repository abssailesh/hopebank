// routes/notificationRoutes.js

const express = require("express");
const { getNotifications, markAsRead } = require("../controllers/notificationController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// This route will only be accessible if the request contains a valid token.
router.get("/", protect, getNotifications);

// This route expects a PUT request to mark a notification as read.
// Ensure your frontend sends the notification ID appropriately.
router.put("/mark-read", protect, markAsRead);

module.exports = router;
