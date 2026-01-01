const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const createProductValidation = [
  body("name") 
    .trim()
    .notEmpty().withMessage("Product name is required"),
 
  body("sku")
    .trim()
    .notEmpty().withMessage("SKU is required"),

  body("categoryId")
    .notEmpty().withMessage("Category ID is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category ID"),

  body("supplierId")
    .notEmpty().withMessage("Supplier ID is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid supplier ID"),

  body("unit")
    .notEmpty().withMessage("Unit is required"),

  body("cost")
    .isFloat({ min: 0 }).withMessage("Cost must be a positive number"),

  body("sell_price")
    .isFloat({ min: 0 }).withMessage("Sell price must be a positive number"),

  body("tax_rate")
    .optional()
    .isFloat({ min: 0 }).withMessage("Tax rate must be a positive number"),

  body("stock_qty")
    .isInt({ min: 0 }).withMessage("Stock quantity must be a positive integer"),

  body("image")
    .optional()
    .isString().withMessage("Image must be a string"),
];

const updateProductValidation = [
  param("id")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),

  body("stock_qty")
    .not()
    .exists()
    .withMessage("Stock cannot be updated directly"),

  body("cost")
    .optional()
    .isFloat({ min: 0 }).withMessage("Cost must be positive"),

  body("sell_price")
    .optional()
    .isFloat({ min: 0 }).withMessage("Sell price must be positive"),

  body("tax_rate")
    .optional()
    .isFloat({ min: 0 }).withMessage("Tax rate must be positive"),
];

const deleteProductValidation = [
  param("id")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),
];

module.exports.productValidation = {
  createProductValidation,
  updateProductValidation,
  deleteProductValidation,
};
