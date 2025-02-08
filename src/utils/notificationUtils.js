import Notification from "../models/Notification.js";

export const sendNotification = async (userId, type, content) => {
  const notification = new Notification({
    user: userId,
    type: type,
    content: content,
  });
  return await notification.save();
};
