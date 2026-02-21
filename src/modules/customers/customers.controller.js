const customersService = require("./customers.service");

exports.createCustomer = async (req, res) => {
  try {
    const userId = req.user.userId; // from auth middleware
    const customer = await customersService.createCustomer(userId, req.body);

    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const customers = await customersService.getCustomers(userId);

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const userId = req.user.userId;
    const customer = await customersService.getCustomer(req.params.id, userId);

    res.json(customer);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
exports.updateCustomer = async (req, res) => {
  try {
    const userId = req.user.userId;

    const customer = await customersService.updateCustomer(
      req.params.id,
      userId,
      req.body,
    );

    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteCustomer = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await customersService.deleteCustomer(req.params.id, userId);

    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
