const quotationService = require("./quotation.service");

exports.downloadPDF = async (req, res, next) => {
  try {
    const { quotationId } = req.params;

    const pdfBuffer = await quotationService.generatePDF(quotationId);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=quotation_${quotationId}.pdf`,
    );
    res.send(pdfBuffer);
  } catch (err) {
    next(err); // Pass to centralized error handler
  }
};
