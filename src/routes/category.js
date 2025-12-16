const express = require("express");
const router = express.Router();

const { categoryController } = require("../controllers/category");

// CREATE
router.post("/", categoryController.createCategory);

// READ
router.get("/", categoryController.getCategory);
// router.get("/:id", categoryController.getCategoryById);

// UPDATE
router.put("/:id", categoryController.updateCategory);

// DELETE
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
