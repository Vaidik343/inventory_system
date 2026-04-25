const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🚀 ~ token:", token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ decoded:", decoded)

    const user = await Users
      .findById(decoded.id)
      .populate({
        path: "role",
        populate: {
          path: "permissions",
          select: "resource action",
        },
      });

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "User not active" });
    }

    req.user = user; // full user object
    next();
  } catch (error) {
    console.log("🚀 Auth error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
