import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepo from "../users.repository";
import validator from "../users.validator";

// register

async function register(data) {
  const existing = await userRepo.findByEmail(data.email);
  if (existing) throw new Error("Email already in use");

  const passwordHash = await bcrypt.hash(data.password, 12);

  return userRepo.create({
    business_name: data.businessName,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password_hash: passwordHash,
  });
}

// login

async function login(email, password) {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { token };
}

function assertOwnership(entity, userId) {
  if (entity.user_id !== userId) {
    throw new ForbiddenError();
  }
}
