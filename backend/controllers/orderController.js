import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Global Variables
const currency = 'pkr'
const deliveryCharges = 200;  // Flat delivery charges for all orders

// Gateway Initialize:
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing Order using COD method - case on delivery
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: `Failed to place order: ${error.message}` });
  }
};

// Placing Order using Online Payment method (Stripe, Razorpay)
const placeOrderStripe = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  const {origin} = req.headers;   // Get the origin from request headers - frontend URL 
  try {
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod : "Stripe",
      payment: false,
      date: Date.now(),
    });
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Amount in cents
      },
      quantity: item.quantity,
    }));



    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100, // Amount in cents
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(201).json({ success: true, message: "Order placed successfully", session_url: session.url });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

// Verify Stripe:
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ success: true, message: "Payment verified and order confirmed" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Payment failed, order cancelled" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment" });
  }
};

const placeOrderRazorpay = async (req, res) => {
  const { cartItems, totalAmount, deliveryInfo, paymentMethod, paymentDetails } = req.body;
  const userId = req.userId; // Assuming userId is set in the auth middleware
  try {
    const newOrder = new orderModel({
      userId,
      items: cartItems,
      amount: totalAmount,
      address: deliveryInfo,
      paymentMethod,
      paymentDetails,
      date: Date.now(),
    });
    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

// All orders data for admin panel - http://localhost:8080/api/orders/list - POST
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// User order data for frontend

const userOrders = async (req, res) => {
  const {userId} = req.body; 
  try {
    const orders = await orderModel.find({ userId })
    console.log(orders);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
};

// Update order status by admin
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};

export { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, verifyStripe, updateStatus, userOrders };
