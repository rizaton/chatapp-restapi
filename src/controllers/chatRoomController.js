import ChatRoom from "../models/ChatRoom.js";

export const readChatRoom = async (req, res) => {
  const chatRooms = await ChatRoom.find();
  res.status(200).json(chatRooms);
};

export const readOneChatRoomInfo = async (req, res) => {
  try {
    const { _id } = req.params;
    const chatRoom = await ChatRoom.findOne({ _id });
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getChatRoomMembers = async (req, res) => {
  try {
    const { _id } = req.params;
    const chatRoom = await ChatRoom.findOne({ _id }).populate(
      "members.userId",
      "username name"
    );
    res.status(200).json(chatRoom.members);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createChatRoom = async (req, res) => {
  try {
    const chatRoom = new ChatRoom(req.body);
    await chatRoom.save();
    res.status(201).send(chatRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateChatRoom = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, isGroup, members } = req.body;
    const chatRoom = await ChatRoom.findOneAndUpdate(
      { _id },
      { name, isGroup, members },
      { new: true }
    );
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteChatRoom = async (req, res) => {
  try {
    const { _id } = req.params;
    await ChatRoom.findOneAndDelete({ _id });
    res.status(200).json({ message: "Chat room deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
