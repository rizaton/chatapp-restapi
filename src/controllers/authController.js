import User from "../models/User.js";
import dotenv from "dotenv";
import { writeLogToFile } from "../utils/logUtils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import redisClient from "../config/redis.js";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userEmailExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ username });

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (userEmailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (userNameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await User.create({ username, email, password });

    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    writeLogToFile(error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      res.status(200).json({
        userId: user._id,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    writeLogToFile(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (req, res) => {
  const { userId, refreshToken } = req.body;

  if (!userId || !refreshToken) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    await verifyRefreshToken(userId, refreshToken);
    const newAccessToken = generateAccessToken({ _id: userId });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    writeLogToFile(error);
    res.status(403).json({ message: "Refresh token is invalid or expired" });
  }
};

export const logout = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is needed" });
    }

    await redisClient.del(userId.toString());
    res.json({ message: "Logout berhasil" });
  } catch (error) {
    writeLogToFile(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
