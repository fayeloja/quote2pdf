// src/modules/auth/auth.service.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRepository = require("./auth.repository");

const SALT_ROUNDS = 12;

exports.register = async ({
  business_name,
  first_name,
  last_name,
  email,
  password,
  phone,
}) => {
  // 1. Check if email already exists
  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // 2. Hash password
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  // 3. Create user
  const newUser = await authRepository.createUser({
    business_name,
    first_name,
    last_name,
    email,
    phone,
    password_hash,
  });

  return newUser;
};

exports.login = async ({ email, password }) => {
  // 1. Check if user exists
  const user = await authRepository.findByEmail(email);

  if (!user || !user.is_active) {
    throw new Error("User not found");
  }

  // 2. Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // 3. Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return {
    token,
    user: {
      id: user.id,
      business_name: user.business_name,
      email: user.email,
    },
  };
};
