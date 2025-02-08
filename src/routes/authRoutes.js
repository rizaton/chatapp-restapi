import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
