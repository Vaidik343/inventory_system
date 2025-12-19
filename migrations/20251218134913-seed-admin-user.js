const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

module.exports.up = async (db) => {
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  await db.collection("users").insertOne({
    _id: uuidv4(),
    role: "admin-role-id", // 🔑 MUST match role seed
    email: "admin@example.com",
    password: passwordHash,
    isActive: true,
    last_login: null,
    refreshToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

module.exports.down = async (db) => {
  await db.collection("users").deleteOne({
    email: "admin@example.com",
  });
};
