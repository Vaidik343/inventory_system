const express = require("express");
const router = express.Router();

const {
  suppliersControllers
} = require("../controllers/Suppliers");
const {apiLimiter} = require('../middlewares/rateLimiter');


const {supplierValidation} = require("../validators/supplierValidation")
const validate = require("../middlewares/validate")


// CREATE SUPPLIER
router.post("/suppliers", apiLimiter, supplierValidation.createSupplierValidation, validate ,suppliersControllers.createSuppliers);

// GET ALL SUPPLIERS
router.get("/suppliers",apiLimiter, suppliersControllers.getSuppliers);

// UPDATE SUPPLIER
router.put("/suppliers/:id",apiLimiter, supplierValidation.updateSupplierValidation, validate, suppliersControllers.updateSuppliers);

// DELETE SUPPLIER
router.delete("/suppliers/:id",apiLimiter,  supplierValidation.supplierIdParamValidation, validate,suppliersControllers.deleteSuppliers);

module.exports = router;
 