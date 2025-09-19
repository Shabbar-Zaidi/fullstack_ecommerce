import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
dotenv.config();

// App configuration
const app = express();
const PORT = process.env.PORT || 8080;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
