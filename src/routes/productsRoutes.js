const {productsController} = require("../controllers/products")
const express = require("express");

const router = express.Router();

router.post("/products", productsController.createProducts);
router.get("/products", productsController.getProducts);
router.put("/products/:id" , productsController.updateProducts );
router.patch("/product/:id", productsController.deleteProducts);

module.exports = router;