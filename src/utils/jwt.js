import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisClient from "../config/redis.js";
import { writeLogToFile } from "./logUtils.js";

dotenv.config();

export const generateAccessToken = (user) => {
  try {
    return jwt.sign({ userId: user._id }, process.env.JWT_ACCESS, {
      expiresIn: process.env.ACCESS_EXPIRES || "15m",
    });
  } catch (error) {
    writeLogToFile(error);
    throw new Error("Gagal membuat access token");
  }
};

export const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      userId: user._id,
      password: user.password,
    },
    process.env.JWT_REFRESH,
    {
      expiresIn: process.env.REFRESH_EXPIRES || "7d",
    }
  );
  try {
    if (redisClient) {
      await redisClient.set(user._id.toString(), refreshToken, {
        EX: 60 * 60 * 24 * 1,
      });
    } else {
      console.error(
        "[X] Redis Client is not connected. Skipping token storage."
      );
      writeLogToFile("Redis Client is not connected. Skipping token storage.");
    }
  } catch (error) {
    writeLogToFile(error);
  }

  return refreshToken;
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS);
};

export const verifyRefreshToken = async (userId, token) => {
  try {
    const storedToken = await redisClient.get(userId.toString());

    if (!storedToken || storedToken !== token) {
      throw new Error("Refresh token tidak valid");
    }
    return jwt.verify(token, process.env.JWT_REFRESH);
  } catch (error_redis) {
    writeLogToFile(error_redis);
    throw new Error("Failed verifying token.");
  }
};
