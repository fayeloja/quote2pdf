const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided or Unauthorized User" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Safety check: Ensure the payload exists
    if (!decoded) {
      throw new Error("Payload missing");
    }

    req.user = decoded; // Contains the userId and email from your AuthService { userId, email }
    next();
  } catch (error) {
    // This handles expired tokens or modified/fake tokens
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
