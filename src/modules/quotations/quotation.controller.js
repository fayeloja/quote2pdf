//Handles HTTP requests, calls service, returns JSON (in and out)

exports.createQuotation = async (req, res) => {
  const userId = req.user.id;

  const quotation = await quotation.Service.createDraft(userId, req.body);

  res.status(201).json(quotation);
};
