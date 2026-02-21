const customersRepository = require("./customers.repository");

// Create customer
exports.createCustomer = async (userId, payload) => {
  // validation here later

  const newCustomer = await customersRepository.createCustomer({
    ...payload,
    user_id: userId,
  });

  return newCustomer;
};

// List All customers
exports.getCustomers = async (userId) => {
  return customersRepository.getCustomersByUserId(userId);
};

// Get one customer
exports.getCustomer = async (customerId, userId) => {
  const customer = await customersRepository.getCustomerById(
    customerId,
    userId,
  );

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

// UPDATE
exports.updateCustomer = async (customerId, userId, payload) => {
  const updatedCustomer = await customersRepository.updateCustomer(
    customerId,
    userId,
    payload,
  );

  if (!updatedCustomer) {
    throw new Error("Customer not found or no valid fields provided");
  }

  return updatedCustomer;
};

// DELETE
exports.deleteCustomer = async (customerId, userId) => {
  const deleted = await customersRepository.deleteCustomer(customerId, userId);

  if (!deleted) {
    throw new Error("Customer not found");
  }

  return { message: "Customer deleted successfully" };
};
