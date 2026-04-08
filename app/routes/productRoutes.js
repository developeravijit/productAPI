const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

router.post("/v1/create", productController.create);
router.get("/v1/product/all", productController.allPorducts);
router.get("/v1/product/:id", productController.readProduct);
router.put("/v1/product/update/:id", productController.update);
router.delete("/v1/product/delete/:id", productController.softDelete);
router.get("/v1/product/delete/product", productController.deletedProduct);

module.exports = router;
