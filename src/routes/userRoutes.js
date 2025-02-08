import express from "express";
import {
  readUser,
  readOneUser,
  readUserChatRooms,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", readUser);
router.get("/:_id", readOneUser);
router.get("/chatrooms/:_id", readUserChatRooms);
router.post("/create", createUser);
router.put("/edit/:_id", updateUser);
router.delete("/delete/:_id", deleteUser);

export default router;
