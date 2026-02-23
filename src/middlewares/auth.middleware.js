const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided or Unauthorized User" });
  }

  const token = authHeader.split(" ")[1];

  // Safety: Check if Secret exists before trying to verify
  if (!process.env.JWT_SECRET) {
    console.error(
      "CRITICAL: JWT_SECRET is not defined in environment variables",
    );
    return res
      .status(500)
      .json({ message: "Internal server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Safety check: Ensure the payload exists
    if (!decoded) {
      throw new Error("Payload missing");
    }

    req.user = decoded; // Contains the userId and email from your AuthService { userId, email }
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({
      message:
        error.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
    // This handles expired tokens or modified/fake tokens
    //return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
