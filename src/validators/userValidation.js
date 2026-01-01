const {body, param} = require("express-validator");

const createUserValidation = [
    body("role").notEmpty().withMessage("Role is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6}).withMessage("Password must be at least 6 characters"),
    body("isActive").optional().isBoolean(),
    body("last_login").optional().isISO8601().toDate(),
]

const updateUserValidation = [
    param("id").isMongoId().withMessage("Invalid user ID"),

    body("role").optional().notEmpty(),
    body("email").optional().isEmail(),
    body("password").optional().isLength({min:6}),
    body("isActive").optional().isBoolean(),
    body("last_login").optional().isISO8601().toDate(),
]

const deleteUserValidation = [
    param("id").isMongoId().withMessage("Invalid user ID")
]
   
module.exports.userValidation = {createUserValidation, updateUserValidation,deleteUserValidation} 