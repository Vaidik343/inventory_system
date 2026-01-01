    const { body } = require("express-validator");
const mongoose = require("mongoose");

const adjustStockValidation = [
  body("productId")
    .notEmpty().withMessage("Product ID is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),

  body("changes")
    .notEmpty().withMessage("Changes is required")
    .isInt({ min: -1000000, max: 1000000 })
    .withMessage("Changes must be an integer")
    .custom(value => value !== 0)
    .withMessage("Changes cannot be zero"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required"),

  body("referenceId")
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid reference ID"),

  body("changedBy")
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid changedBy user ID"),
];

module.exports = {
  adjustStockValidation,
};
 