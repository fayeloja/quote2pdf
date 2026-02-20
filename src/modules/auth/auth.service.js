const bcrypt = require("bcrypt");
const db = require("../../utils/db");

exports.register = async ({
  business_name,
  first_name,
  last_name,
  email,
  password,
  phone,
}) => {
  //1. Check if email already exists
  const existingUser = await db.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  if (existingUser.rows.length > 0) {
    throw new Error("Email already registered");
  }

  //2. Hash password
  const saltRounds = 12;
  const password_hash = await bcrypt.hash(password, saltRounds);

  //3. Insert user in DB
  const newUser = await db.query(
    `
    INSERT INTO users (
    business_name, 
    first_name, 
    last_name, 
    email, 
    phone,
    password_hash
    ) VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING id, business_name, first_name, last_name, email, created_at
     `,
    [business_name, first_name, last_name, email, phone, password_hash],
  );

  return newUser.rows[0];
};
