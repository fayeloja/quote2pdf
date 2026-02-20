exports.register = async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(user);
};
