const { default: mongoose } = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      required: true,
    },
    status: {
  type: String,
  enum: ["active", "cancelled"],
  default: "active",
  required: true
},
    invoiceNumber: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      ref: "Users",
      required: true,
    },

    soldAt: {
      type: Date,
      default: Date.now,
      required: true,
    },

    sales_items: [
      {
        type: String,
        ref: "SalesItems",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema);
