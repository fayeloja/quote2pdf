const express = require("express");
const router = express.Router();
const customersController = require("./customers.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.use(authMiddleware);

//Creat a new customer
router.post("/", customersController.createCustomer);

//Get all customers
router.get("/", customersController.getCustomers);

//Get one customer
router.get("/:id", customersController.getCustomer);

//Update a customer
router.patch("/:id", customersController.updateCustomer);

//Delete a customer
router.delete("/:id", customersController.deleteCustomer);

module.exports = router;
