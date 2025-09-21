import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // Check if the product exists
    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;
    // console.log(cartData)
    // console.log(userId,itemId, size)
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ success: true, msg: "Product added to cart", cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, msg: "Error adding to cart" });
  }
};
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ success: true, msg: "Cart updated successfully", cartData });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, msg: "Error updating cart" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error getting user cart:", error);
    res.status(500).json({ success: false, msg: "Error getting user cart" });
  }
};

export { addToCart, getUserCart, updateCart };
