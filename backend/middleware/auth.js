import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, msg: "No token, authorization denied" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error("Token is not valid", error);
    return res.status(401).json({ success: false, msg: "Token is not valid" });
  }
};

export { authUser };
