const {productsController} = require("../controllers/products")
const express = require("express");
const {apiLimiter} = require('../middlewares/rateLimiter');
const {productValidation} = require('../validators/productValidation')
const validate = require("../middlewares/validate")
const router = express.Router();

router.post("/products",apiLimiter, productValidation.createProductValidation,validate, productsController.createProducts);
router.get("/products",apiLimiter,productsController.getProducts);
router.put("/products/:id" ,apiLimiter, productValidation.updateProductValidation,validate,  productsController.updateProducts );
router.patch("/product/:id",apiLimiter, productValidation.deleteProductValidation,validate ,productsController.deleteProducts);

module.exports = router;