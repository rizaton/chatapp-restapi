import User from "../models/User.js";
import ChatRoom from "../models/ChatRoom.js";

export const readUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const readOneUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const readUserChatRooms = async (req, res) => {
  try {
    const { _id } = req.params;
    const chatRooms = await ChatRoom.find({ "members.userId": _id });
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { username, name, email, password } = req.body;
    const user = await User.findOneAndUpdate(
      { _id },
      { username, name, email, password },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    await User.findOneAndDelete({ _id });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
