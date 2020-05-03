const express = require("express");

const productsRouter = require("./products-router");
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send({
    status: "ok",
  });
});

apiRouter.use("/products", productsRouter);

module.exports = apiRouter;
