import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/securityUtils.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: {
    type: String,
    default: function () {
      return this.username;
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar_url: { type: String, default: "" },
  status: { type: String, enum: ["online", "offline"], default: "offline" },
  created_at: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
