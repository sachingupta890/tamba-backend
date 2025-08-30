import {
  getUserNotifications,
  markNotificationsAsRead,
} from "../services/notificationService.js";
import logger from "../config/logger.js";

/**
 * Controller to get all notifications for the logged-in user.
 */
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // Comes from the 'protect' middleware
    const notifications = await getUserNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    logger.error(
      `Error fetching notifications for user ${req.user._id}: ${error.message}`
    );
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
};

/**
 * Controller to mark all unread notifications as read for the logged-in user.
 */
export const markAsRead = async (req, res) => {
  try {
    const userId = req.user._id; // Comes from the 'protect' middleware
    await markNotificationsAsRead(userId);
    res.status(200).json({ message: "Notifications marked as read." });
  } catch (error) {
    logger.error(
      `Error marking notifications as read for user ${req.user._id}: ${error.message}`
    );
    res.status(500).json({ message: "Failed to update notifications." });
  }
};
