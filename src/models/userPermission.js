const mongoose = require("mongoose");

const userPermissionSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "Users", required: true },
    permissionId: { type: String, ref: "Permission", required: true },

    granted: { type: Boolean, default: true }, // revoke = false

    expiresAt: { type: Date, default: null }, // temporary permission
  },
  { timestamps: true }
);
userPermissionSchema.index({ userId: 1, permissionId: 1 }, { unique: true });
module.exports = mongoose.model("UserPermission", userPermissionSchema);
