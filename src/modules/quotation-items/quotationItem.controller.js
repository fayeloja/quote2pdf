// quotationItem.controller.js
exports.create = async (req, res) => {
  const { quotationId } = req.params;
  const userId = req.user.id;

  const item = await service.addItem(userId, quotationId, req.body);

  res.status(201).json(item);
};
