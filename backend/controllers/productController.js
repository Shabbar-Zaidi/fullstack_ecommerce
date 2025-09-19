import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// Function for add product - http://localhost:8080/api/product/add
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    // If one of the images is missing so we use {req.files.image1} to prevent from error
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      // Promise all to handle multiple asynchronous operations
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // console.log(imagesUrl);

    // console.log(images);
    // console.log(image1, image2, image3, image4);
    // console.log(req.files);
    // console.log(req.body);
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const newProduct = new productModel(productData);

    await newProduct.save();

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Error adding product", error: error.message });
  }
};

// Function for list products - get all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, message: "Products retrieved successfully", products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving products", error });
  }
};

// function for removing product - http://localhost:8080/api/product/remove     =>
// Pass throught postman body
//     {
//     "id":"68cbf17739910a1de36e5da3"
// }
const removeProduct = async (req, res) => {
  //   const { id } = req.params;     // without passing through url
  const { id } = req.body; // passing through body
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product removed successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing product", error });
  }
};

// function for get single product info by id - http://localhost:8080/api/product/single
// Pass throught postman body
//     {
//     "id":"68cbf1cd39910a1de36e5da7"
// }
const singleProduct = async (req, res) => {
  //   const { id } = req.params;   // without passing through url
  try {
    const { id } = req.body;    // passing through body
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product retrieved successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving product", error });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
