const { body, param } = require("express-validator");

const createSupplierValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Supplier name is required")
    .isLength({ min: 2 })
    .withMessage("Supplier name must be at least 2 characters"),

  body("contact_person")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Contact person must be at least 2 characters"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("address")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters"),

  body("payment_term")
    .optional()
    .isString()
    .withMessage("Payment term must be a string"),

  body("note")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Note must be under 500 characters"),
];

const updateSupplierValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid supplier ID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Supplier name must be at least 2 characters"),

  body("contact_person")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Contact person must be at least 2 characters"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("address")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters"),

  body("payment_term")
    .optional()
    .isString()
    .withMessage("Payment term must be a string"),

  body("note")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Note must be under 500 characters"),
];

const supplierIdParamValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid supplier ID"),
];

module.exports.supplierValidation = {
  createSupplierValidation,
  updateSupplierValidation,
  supplierIdParamValidation,
};
 