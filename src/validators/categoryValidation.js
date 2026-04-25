const {body, param} = require("express-validator");

const createCategoryValidation = [
    body("name").notEmpty().withMessage("Name is required")
]

const updateCategoryValidation = [
    // body("id").withMessage("Invalid category ID").notEmpty(),

    body("name").optional().notEmpty()
]

const deleteCategoryValidation = [
        // param("id").withMessage("Invalid category ID")
]

module.exports.categoryValidation = {createCategoryValidation , deleteCategoryValidation, updateCategoryValidation} 