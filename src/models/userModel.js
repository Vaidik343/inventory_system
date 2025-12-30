const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },

    role: {
      type: String,
      ref: "Roles",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    last_login: {
      type: Date,
    },
    refreshToken: {
      type: String,
      default: null,
    },

     extraPermissions: [
    {
      resource: String,
      action: String,
      expiresAt: Date, // optional
    },
  ],

  revokedPermissions: [
    {
      resource: String,
      action: String,
    },
  ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


/* 🔐 Compare password */
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Users", userSchema);
