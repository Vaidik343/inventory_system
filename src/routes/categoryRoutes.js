const express = require("express");
const router = express.Router();

const { categoryController } = require("../controllers/category");

// CREATE
router.post("/category", categoryController.createCategory);

// READ
router.get("/category", categoryController.getCategory);
// router.get("/:id", categoryController.getCategoryById);

// UPDATE
router.put("/category/:id", categoryController.updateCategory);

// DELETE
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
