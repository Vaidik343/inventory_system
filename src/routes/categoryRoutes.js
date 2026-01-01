const express = require("express");
const router = express.Router();

const { categoryController } = require("../controllers/category");
const {apiLimiter} = require('../middlewares/rateLimiter');

const {categoryValidation} = require("../validators/categoryValidation")
const validate = require("../middlewares/validate")

// CREATE
router.post("/category", apiLimiter, categoryValidation.createCategoryValidation,validate, categoryController.createCategory);

// READ
router.get("/category", apiLimiter, categoryController.getCategory);
// router.get("/:id", categoryController.getCategoryById);

// UPDATE
router.put("/category/:id", apiLimiter,categoryValidation.updateCategoryValidation,validate ,categoryController.updateCategory);

// DELETE
router.delete("/category/:id", apiLimiter, categoryValidation.deleteCategoryValidation,validate,categoryController.deleteCategory);

module.exports = router;
