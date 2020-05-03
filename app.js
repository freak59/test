require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

const cors = require("cors");

const apiRouter = require("./api");
const productsRouter = require("./api/products-router");

var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");

const app = express();
mongoose.Promise = global.Promise;

// Object destructuring ES6
const {
  PORT = 5002,
  MONGO_DB_HOST = "localhost",
  MONGO_BD_PORT = 27017,
  MONGO_DB_NAME = "demo2",
} = process.env;

mongoose
  .connect(`mongodb://${MONGO_DB_HOST}:${MONGO_BD_PORT}/${MONGO_DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((mongoose) => {
    console.log("connected to mongo");
  })
  .catch(console.error);

app.use(express.json());
app.use("/api", cors(), apiRouter);

app.use("api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", productsRouter);

app.get("/", (req, res) => {
  fetch(`http://localhost:${PORT}/api/products`)
    .then((result) => result.json())
    .then((result) => {
      // console.log(result)
      res.render("homepage", { products: result });
    });
});
app.get("/:productId", async (req, res) => {
  const product = await fetch(
    `http://localhost:${PORT}/api/products/${req.params.productId}`
  ).then((result) => result.json());
  // TODO: print related products

  res.render("productDetail", { product: product, relatedProduct: [] });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
