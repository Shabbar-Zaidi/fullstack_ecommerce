import express from "express";
import { allOrders, placeOrder,  placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import { authUser } from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.put("/status", adminAuth, updateStatus);

// Payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// User features
orderRouter.post("/userorders", authUser, userOrders);

// Verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
