import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const readMessage = async (req, res) => {
  const messages = await Message.find();
  res.status(200).json(messages);
};

export const readChatRoomMessages = async (req, res) => {
  try {
    const { _id } = req.params;
    const messages = await Message.find({ chatRoom: _id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const readUserMessages = async (req, res) => {
  try {
    const { _id } = req.params;
    const messages = await Message.find({ sender: _id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { chatRoom } = req.params;
    const { sender, content, messageType } = req.body;

    const chatroom = await ChatRoom.findById(chatRoom);
    if (!chatroom) {
      return res.status(404).json({ error: "ChatRoom not found" });
    }
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const user = await User.findById(sender);
    const recipients = chatroom.members.filter(
      (member) => !member.userId.equals(sender)
    );
    const status = recipients.map((member) => ({
      user: member.userId,
      state: "sent",
    }));

    const message = new Message({
      sender,
      chatRoom,
      content,
      messageType,
      status,
    });
    await message.save();

    const notifications = recipients.map((member) => ({
      user: member.userId,
      type: "message",
      content: `New message from ${user.name}`,
    }));

    await Notification.create(notifications);

    res.status(201).json([message, notifications]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    const { content } = req.body;
    const message = await Message.findOneAndUpdate(
      { _id },
      { content, "log.edited": true, "log.editedAt": Date.now() },
      { new: true }
    );
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    const message = await Message.findOneAndUpdate(
      { _id },
      { content: "", "log.deleted": true },
      { new: true }
    );
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
