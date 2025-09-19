import express from "express";
import { registerUser, loginUser, adminLogin } from "../controllers/userController.js";
const userRouter = express.Router();

// Login User
userRouter.post("/login", loginUser);

// Register User
userRouter.post("/register", registerUser);

// Admin Login
userRouter.post("/admin", adminLogin);

export default userRouter;