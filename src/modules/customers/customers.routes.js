const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");

//Get all customers
router.get("/", authMiddleware, authController.getProfile);
