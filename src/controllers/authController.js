const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");

const generateAccessToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email }).populate("role");
  if (!user || !user.isActive) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role.name,
      },
    });
};

const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await Users.findById(decoded.id).populate("role");
    if (!user || user.refreshToken !== token)
      return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};


const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(400).json({ message: "No refresh token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await Users.findById(decoded.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie("refreshToken").json({ message: "Logged out successfully" });
  } catch (err) {
    res.clearCookie("refreshToken").json({ message: "Logged out" });
  }
};


module.exports.authController = { login, refresh,logout };
