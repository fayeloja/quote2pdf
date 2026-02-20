// src/modules/auth/auth.repository.js

const db = require("../../utils/db");

exports.findByEmail = async (email) => {
  const result = await db.query(
    `SELECT id, business_name, first_name, last_name, email, phone, password_hash, is_active
     FROM users 
     WHERE email = $1`,
    [email],
  );

  return result.rows[0] || null;
};

exports.createUser = async ({
  business_name,
  first_name,
  last_name,
  email,
  phone,
  password_hash,
}) => {
  const result = await db.query(
    `
    INSERT INTO users (
      business_name, 
      first_name, 
      last_name, 
      email, 
      phone,
      password_hash
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, business_name, first_name, last_name, email, created_at
    `,
    [business_name, first_name, last_name, email, phone, password_hash],
  );

  return result.rows[0];
};
