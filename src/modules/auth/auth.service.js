const userRepo = require("../users/user.repo");
const { hashPassword, comparePassword } = require("../../utils/password");
const { signToken } = require("../../utils/jwt");

exports.register = async (data) => {
  const exists = await userRepo.findByEmail(data.email);
  if (exists) throw new Error("Email already exists");

  const passwordHash = await hashPassword(data.password);

  return userRepo.create({
    ...data,
    password_hash: passwordHash,
  });
};

exports.login = async (email, password) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password_hash);
  if (!valid) throw new Error("Invalid credentials");

  return {
    token: signToken({ id: user.id, email: user.email }),
  };
};
