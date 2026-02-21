const customersService = require("./customers.service");
const sendResponse = require("../../utils/sendResponse");

exports.createCustomer = async (req, res) => {
  try {
    const userId = req.user.userId; // from auth middleware
    const customer = await customersService.createCustomer(userId, req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCustomers = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const customers = await customersService.getCustomers(userId, req.query);

    sendResponse(res, {
      message: "Customers retrieved successfully",
      data: customers.data,
      meta: customers.meta,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const userId = req.user.userId;
    const customer = await customersService.getCustomer(req.params.id, userId);

    sendResponse(res, {
      message: "Customer retrieved successfully",
      data: customer,
    });
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

    sendResponse(res, {
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteCustomer = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await customersService.deleteCustomer(req.params.id, userId);

    sendResponse(res, {
      message: "Customer deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
