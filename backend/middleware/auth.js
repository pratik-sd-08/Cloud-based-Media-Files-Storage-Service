import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Session expired" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // VERY IMPORTANT: attach user id to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
