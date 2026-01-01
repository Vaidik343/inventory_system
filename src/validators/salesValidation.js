const { body, param } = require("express-validator");

const createSalesValidation = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be a non-empty array"),

  body("items.*.productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("items.*.sell_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Sell price must be >= 0"),

  body("items.*.discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be >= 0"),

  body("items.*.tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be >= 0"),

  body("payment_status")
    .optional()
    .isIn(["pending", "paid", "refunded"])
    .withMessage("Invalid payment status"),
];

const saleIdParamValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid sale ID"),
];

module.exports = {
  createSalesValidation,
  saleIdParamValidation,
};
 