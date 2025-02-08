import Notification from "../models/Notification.js";

export const readNotification = async (req, res) => {
  const notifications = await Notification.find();
  res.status(200).json(notifications);
};

export const readUserNotifications = async (req, res) => {
  try {
    const { _id } = req.params;
    const notifications = await Notification.find({ user: _id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const { _id } = req.params;
    const { isRead } = req.body;
    const notification = await Notification.findOneAndUpdate(
      { _id },
      { isRead },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
