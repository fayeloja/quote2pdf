const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded; // { id, email }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
