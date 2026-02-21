const customersRepository = require("./customers.repository");
const AppError = require("../../utils/appError");

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
// exports.getCustomers = async (userId) => {
//   return customersRepository.getCustomersByUserId(userId);
// };

exports.getCustomers = async (userId, query) => {
  let page = parseInt(query.page) || 1;
  let limit = parseInt(query.limit) || 10;

  if (page < 1) page = 1;

  // Prevent abuse
  if (limit > 100) limit = 100;
  if (limit < 1) limit = 10; //Ensures limite isnot 0 or negative

  //calculate how many records to skip
  const offset = (page - 1) * limit;

  //pass 'offset' instad of 'page' to the repository
  const { customers, total } = await customersRepository.getCustomersPaginated(
    userId,
    limit,
    offset,
  );

  const totalPages = Math.ceil(total / limit);

  return {
    data: customers,
    meta: {
      total: parseInt(total), //Ensure it's a number, Postgres returns it as a string
      totalPages,
      currentPage: page,
      perPage: limit,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
    },
  };
};

// Get one customer
exports.getCustomer = async (customerId, userId) => {
  const customer = await customersRepository.getCustomerById(
    customerId,
    userId,
  );

  if (!customer) {
    throw new AppError("Customer not found", 404);
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
    throw new AppError("Customer not found or no valid fields provided", 404);
  }

  return updatedCustomer;
};

// DELETE
exports.deleteCustomer = async (customerId, userId) => {
  const deleted = await customersRepository.deleteCustomer(customerId, userId);

  if (!deleted) {
    throw new AppError("Customer not found", 404);
  }

  return { message: "Customer deleted successfully" };
};
