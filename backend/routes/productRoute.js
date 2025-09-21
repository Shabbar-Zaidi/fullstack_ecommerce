import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct, uploadAllProducts } from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  // copy the token from user/admin route and paste it in the /add route through the postman header
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post(
  "/uploadAll",
  // adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  uploadAllProducts
);

productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);

productRouter.get("/ping", (req, res) => {
  res.status(200).json({ success: true, message: "Product router is working" });
});

export default productRouter;
