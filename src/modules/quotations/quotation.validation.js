const { z } = require("zod");

// --- SCHEMAS ---

const paramsSchema = z.object({
  quotationId: z.string().uuid({ message: "Invalid quotation ID format" }),
});

updateStatusSchema = z.object({
  // Validates that its a real UUID string
  quotationId: z.string().uuid({ message: "Invalid quotation ID format" }),

  // Validates against specific DB check constrain
  status: z.enum(["draft", "sent", "accepted", "rejected", "converted"], {
    errorMap: () => ({
      message: "Status must be: draft, sent, accepted, rejected, or converted",
    }),
  }),
});

// Export them so they can be used elsewhere (like in tests)
exports.paramsSchema = paramsSchema;
exports.updateStatusSchema = updateStatusSchema;

exports.validateDownloadPDF = (req, res, next) => {
  try {
    paramsSchema.parse(req.params);
    next();
  } catch (err) {
  const formattedErrors = err.errors.map(e => e.message).join(", ");
  res.status(400).json({ status: "error", message: formattedErrors });
}
};

exports.validateUpdateStatus = (req, res, next) => {
  try {
    updateStatusSchema.parse({
      ...req.body,
      quotationId: req.params.quotationId,
    });
    next();
  } catch (err) {
  const formattedErrors = err.errors.map(e => e.message).join(", ");
  res.status(400).json({ status: "error", message: formattedErrors });
}
};
