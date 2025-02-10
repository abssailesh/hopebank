const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

// Fetch notifications for a user
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id });
  res.json(notifications);
});

// Mark notifications as read
const markAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ userId: req.user._id }, { isRead: true });
  res.json({ message: "Notifications marked as read" });
});

module.exports = { getNotifications, markAsRead };
