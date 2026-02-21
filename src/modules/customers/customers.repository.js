const db = require("../../utils/db");

// Create customer
exports.createCustomer = async (data) => {
  const {
    user_id,
    first_name,
    last_name,
    email,
    phone,
    address,
    company_name,
    city,
    state,
    country,
  } = data;

  const result = await db.query(
    `
    INSERT INTO customers (
      user_id,
      first_name,
      last_name,
      email,
      phone,
      address,
      company_name,
      city,
      state,
      country
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
    `,
    [
      user_id,
      first_name,
      last_name,
      email,
      phone,
      address,
      company_name,
      city,
      state,
      country,
    ],
  );

  return result.rows[0];
};

// Get all customers for a user
exports.getCustomersByUserId = async (userId) => {
  const result = await db.query(
    `SELECT * FROM customers WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows;
};

// Get single customer
exports.getCustomerById = async (customerId, userId) => {
  const result = await db.query(
    `SELECT * FROM customers WHERE id = $1 AND user_id = $2`,
    [customerId, userId],
  );

  return result.rows[0]; // Returns the customer, or undefined if not found/unauthorized
};

// UPDATE
exports.updateCustomer = async (id, user_id, fields) => {
  const allowedFields = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "address",
    "company_name",
    "city",
    "state",
    "country",
  ];

  const updates = [];
  const values = [];
  let index = 1;

  for (const key of Object.keys(fields)) {
    if (allowedFields.includes(key)) {
      updates.push(`${key} = $${index}`);
      values.push(fields[key]);
      index++;
    }
  }

  if (updates.length === 0) {
    return null;
  }

  values.push(id);
  values.push(user_id);

  const result = await db.query(
    `
    UPDATE customers
    SET ${updates.join(", ")}, updated_at = NOW()
    WHERE id = $${index} AND user_id = $${index + 1}
    RETURNING *
    `,
    values,
  );

  return result.rows[0];
};

// DELETE
exports.deleteCustomer = async (id, user_id) => {
  const result = await db.query(
    `
    DELETE FROM customers
    WHERE id = $1 AND user_id = $2
    RETURNING id
    `,
    [id, user_id],
  );

  return result.rows[0];
};
