const {body, param} = require("express-validator");

const createCategoryValidation = [
    body("name").notEmpty().withMessage("Name is required")
]

const updateCategoryValidation = [
    param("id").isMongoId().withMessage("Invalid category ID"),

    body("name").optional().notEmpty()
]

const deleteCategoryValidation = [
        param("id").isMongoId().withMessage("Invalid category ID")
]

module.exports.categoryValidation = {createCategoryValidation , deleteCategoryValidation, updateCategoryValidation} 