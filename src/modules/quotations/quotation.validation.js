const { z } = require("zod");

const paramsSchema = z.object({
  quotationId: z.string().uuid(),
});

exports.validateDownloadPDF = (req, res, next) => {
  try {
    paramsSchema.parse(req.params);
    next();
  } catch (err) {
    res.status(400).json({ status: "error", message: err.errors });
  }
};
