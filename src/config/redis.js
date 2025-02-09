import { createClient } from "redis";
import dotenv from "dotenv";
import { writeLogToFile } from "../utils/logUtils.js";

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
});

try {
  (async () => {
    await redisClient.connect();
    console.log("[/] Connected to Redis");
  })();
} catch (error) {
  redisClient.on("error", (err) => {
    writeLogToFile(error);
    console.error("[X] Redis Error:", err);
  });
}

export default redisClient;
