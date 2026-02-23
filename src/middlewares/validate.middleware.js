const { ZodError } = require("zod");

module.exports = (schema) => (req, res, next) => {
  try {
    // FIXED: Capture the parsed (and potentially transformed) data
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Re-assign so your controller gets the "clean" data
    req.body = parsed.body;
    req.query = parsed.query;
    req.params = parsed.params;

    next();
  } catch (error) {
    // 1. Check specifically for Zod validation errors
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: "fail",
        errors: error.errors.map((err) => ({
          // If path is empty, it's a root error; otherwise join the path
          field: err.path.length > 0 ? err.path.join(".") : "request",
          code: err.code,
          message: err.message,
        })),
      });
    }
    next(error);
  }
};
