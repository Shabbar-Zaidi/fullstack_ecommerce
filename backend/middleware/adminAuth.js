import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized login again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid token", error: error.message });
  }
};

export default adminAuth;
