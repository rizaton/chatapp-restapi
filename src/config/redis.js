import { createClient } from "redis";
import dotenv from "dotenv";
import { writeLogToFile } from "../utils/logUtils.js";

dotenv.config();

let redisClient;

(async () => {
  try {
    redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6379,
      },
      // password: process.env.REDIS_PASSWORD,
    });

    redisClient.on("error", (err) => {
      console.error("[X] Redis Error:", err);
      writeLogToFile(err);
    });

    await redisClient.connect();
    console.log("[/] Connected to Redis");
  } catch (error) {
    redisClient = null;
    console.error("[X] Failed to connect to Redis:", error);
    writeLogToFile(error);
  }
})();

export default redisClient;
