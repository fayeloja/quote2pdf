// version 1.0 is suppose to be bad.
require("dotenv").config();
const errorHandler = require("./src/middlewares/error.middleware");
const express = require("express");
const morgan = require("morgan");
const app = express();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Routes
const authRoutes = require("./src/modules/auth/auth.routes");
const customerRoutes = require("./src/modules/customers/customers.routes");
const quotationRoutes = require("./src/modules/quotations/quotation.routes");

//Swagger Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/quotations", quotationRoutes);
// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Centralized error handler
app.use(errorHandler);

console.log("JWT_SECRET: ", process.env.JWT_SECRET);

//Home Route
app.get("/", (req, res) => {
  res.send("Server is Running successfully");
});

module.exports = app;
