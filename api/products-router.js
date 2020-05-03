const express = require("express");

const productsController = require("./controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/:productId", productsController.getProductById);

productsRouter.post("/", productsController.createProduct);
productsRouter.put("/:productId", productsController.updateProduct);

productsRouter.delete("/:productId", productsController.deleteProduct);

// this will set the product on req.product - for any route that contains
productsRouter.param("productId", productsController.setProductById);

module.exports = productsRouter;
