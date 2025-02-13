import Friend from "../models/Friend.js";

// readFriends,
//   readOneFriendLink,
//   createFriendLink,
//   blockUser,
//   agreeFriendLink,
//   removeFriend,

export const readFriends = async (req, res) => {
  try {
    const friends = await Friend.find({ userlink: req.user._id });
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const readOneFriendLink = async (req, res) => {
  try {
    const { _id } = req.params;
    const friend = await Friend.findOne({ _id });
    res.status(200).json(friend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFriendLink = async (req, res) => {
  try {
    const { _id } = req.params;
    const friend = new Friend({ userlink: _id });
    await friend.save();
    res.status(201).json(friend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
