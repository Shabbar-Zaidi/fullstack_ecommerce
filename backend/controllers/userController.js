import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
// Login User ---- http://localhost:8080/api/user/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.status(200).json({ msg: "Login successful", token });
    } else {
      res.status(400).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message }); // Internal Server Error
  }
};

// Register User ---- http://localhost:8080/api/user/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }
    // Validate email format & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, msg: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        msg: "Please enter a strong password",
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);

    res.status(201).json({ success: true, msg: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Admin Login - http://localhost:8080/api/user/admin
// Pass throught postman body
// {
//     "email":"admin@example.com",
//     "password":"admin123"
// }
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, msg: "Admin login successful", token });
    } else {
      res.status(400).json({ success: false, msg: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
