const {productsController} = require("../controllers/products")
const express = require("express");

const router = express.Router();

router.post("/products", productsController.createProducts);
router.get("/products", productsController.getProducts);
router.put("/products/:id" , productsController.updateProducts );
router.delete("/product", productsController.deleteProducts);

module.exports = router;