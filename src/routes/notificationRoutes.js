import express from "express";
import {
  readNotification,
  readUserNotifications,
  updateNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", readNotification);
router.get("/:_id", readUserNotifications);
router.put("/edit/:_id", updateNotification);

export default router;
