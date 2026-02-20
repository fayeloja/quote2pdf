const authService = require("./auth.service");

exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);

    res.status(200).json({
      message: "Login successful",
      data,
    });
  } catch (error) {
    next(error);
  }
};
