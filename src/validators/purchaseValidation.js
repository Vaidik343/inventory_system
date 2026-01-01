const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const createStockInValidation = [
  body("supplierId")
    .notEmpty().withMessage("Supplier ID is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid supplier ID"),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be a positive number"),

  body("invoice_file_path")
    .optional()
    .isString()
    .withMessage("Invoice file path must be a string"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Purchase items must be a non-empty array"),

  body("items.*.productId")
    .notEmpty()
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),

  body("items.*.qty")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("items.*.cost_price")
    .isFloat({ min: 0.01 })
    .withMessage("Cost price must be greater than 0"),

  body("items.*.batch_No")
    .optional()
    .isString()
    .withMessage("Batch number must be a string"),

  body("items.*.expiry")
    .optional()
    .isISO8601()
    .withMessage("Expiry must be a valid date"),
];

const purchaseIdValidation = [
  param("id")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid purchase ID"),
];

module.exports.purchaseValidation = {
  createStockInValidation,
  purchaseIdValidation,
};
