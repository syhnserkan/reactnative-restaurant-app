const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const authJwt = require("./utilits/jwt");
const errorHandler = require("./utilits/error-handler");

app.use(cors());
app.options("*", cors());

//Middleware
app.use(express.json()); // this method will make our data be understandable by express. (Which are sent from the frontend)
// If you see body parser, you must replace it with express.json
app.use(morgan("tiny"));
app.use(authJwt()); // server is secured based on the token. (Check the user can use or not api)
app.use("/public/uploads", express.static(__dirname + "/public/uploads")); // to show the images
app.use(errorHandler);

//Routes
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "restaurant-database",
  })
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
