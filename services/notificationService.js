import Notification from "../models/notification.js";

export const createNotification = async (userId, message) => {
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw new Error("Could not create notification.");
  }
};

export const getUserNotifications = async (userId) => {
  try {
    return await Notification.find({ userId }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Could not fetch notifications.");
  }
};

export const markNotificationsAsRead = async (userId) => {
  try {
    return await Notification.updateMany(
      { userId, read: false },
      { $set: { read: true } }
    );
  } catch (error) {
    throw new Error("Could not mark notifications as read.");
  }
};
