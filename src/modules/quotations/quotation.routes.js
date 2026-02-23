const express = require("express");
const router = express.Router();
const quotationController = require("./quotation.controller");
const { validateDownloadPDF } = require("./quotation.validation");
const authenticate = require("../../middlewares/auth.middleware");

console.log({
  authenticate,
  validateDownloadPDF,
  downloadPDF: quotationController.downloadPDF,
});

router.get(
  "/download-pdf/:quotationId",
  authenticate,
  validateDownloadPDF,
  quotationController.downloadPDF,
);

module.exports = router;
