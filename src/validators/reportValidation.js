const { query } = require("express-validator");
const mongoose = require("mongoose");

const salesSummaryReportValidation = [
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("startDate must be a valid date"),

  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("endDate must be a valid date"),

  // Logical validation
  query().custom(({ startDate, endDate }) => {
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        throw new Error("startDate cannot be after endDate");
      }
    }
    return true;
  }),
];

const stockMovementReportValidation = [
  query("productId")
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),

  query("reason")
    .optional()
    .isString()
    .withMessage("Reason must be a string"),

  query("from")
    .optional()
    .isISO8601()
    .withMessage("from must be a valid date"),

  query("to")
    .optional()
    .isISO8601()
    .withMessage("to must be a valid date"),

  // Logical validation
  query().custom(({ from, to }) => {
    if (from && to) {
      if (new Date(from) > new Date(to)) {
        throw new Error("from date cannot be after to date");
      }
    }
    return true;
  }),
];

module.exports = {
  salesSummaryReportValidation,
  stockMovementReportValidation,
};
 