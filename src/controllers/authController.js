import User from "../models/User.js";
import dotenv from "dotenv";
import { generateToken } from "../utils/securityUtils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userEmailExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ username });
    if (userEmailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (userNameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const user = await User.create({ username, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: generateAccessToken(user._id),
        refreshToken: generateRefreshToken(user),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error}` });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        userId: user._id,
        accessToken: generateAccessToken(user._id),
        refreshToken: generateRefreshToken(user),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error}` });
  }
};

export const refreshToken = (req, res) => {
  const { userId, refreshToken } = req.body;

  if (!userId || !token) {
    return res.status(403).json({ message: "Refresh token tidak valid" });
  }

  try {
    verifyRefreshToken(userId, refreshToken);
    const newAccessToken = generateAccessToken({ _id: userId });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res
      .status(403)
      .json({ message: "Refresh token tidak valid atau sudah kadaluarsa" });
  }
};
