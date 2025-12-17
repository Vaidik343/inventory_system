const express = require("express");
const router = express.Router();

const {
  suppliersControllers
} = require("../controllers/Suppliers");

// CREATE SUPPLIER
router.post("/suppliers", suppliersControllers.createSuppliers);

// GET ALL SUPPLIERS
router.get("/suppliers", suppliersControllers.getSuppliers);

// UPDATE SUPPLIER
router.put("/suppliers/:id", suppliersControllers.updateSuppliers);

// DELETE SUPPLIER
router.delete("/suppliers/:id", suppliersControllers.deleteSuppliers);

module.exports = router;
