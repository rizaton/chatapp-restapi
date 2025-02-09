import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisClient from "../config/redis.js";
import { writeLogToFile } from "./logUtils.js";

dotenv.config();

export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  });
};

// export const generateRefreshToken = async (user) => {
export const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
    }
  );
  try {
    await redisClient.set(user._id.toString(), refreshToken, {
      EX: 60 * 60 * 24 * 1,
    });
  } catch (error) {
    writeLogToFile(error);
  }

  return refreshToken;
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = async (userId, token) => {
  try {
    const storedToken = await redisClient.get(userId.toString());

    if (!storedToken || storedToken !== token) {
      throw new Error("Refresh token tidak valid");
    }
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error_redis) {
    writeLogToFile(error_redis);
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  }
};
