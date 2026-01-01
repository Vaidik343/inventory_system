const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const createPermissionValidation = [
  body("resource")
    .trim()
    .notEmpty()
    .withMessage("Resource is required"),

  body("action")
    .trim()
    .notEmpty()
    .withMessage("Action is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

const updatePermissionValidation = [
  param("id")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid permission ID"),

  body("resource")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Resource cannot be empty"),

  body("action")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Action cannot be empty"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  // 🔐 Require at least one field
  body().custom(body => {
    const { resource, action, description } = body;
    if (!resource && !action && !description) {
      throw new Error("At least one field is required to update");
    }
    return true;
  }),
];

module.exports.permissionValidation = {
  createPermissionValidation,
  updatePermissionValidation,
};
