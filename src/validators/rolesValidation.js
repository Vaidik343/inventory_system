const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const createRoleValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Role name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Role name must be between 2 and 50 characters"),
];

const updateRoleValidation = [
  param("id")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid role ID"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Role name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Role name must be between 2 and 50 characters"),
];

const deleteRoleValidation = [
  param("id")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid role ID"),
];

module.exports = {
  createRoleValidation,
  updateRoleValidation,
  deleteRoleValidation,
};
 