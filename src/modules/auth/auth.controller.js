const authService = require("./auth.service");

exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "User registered successfully",
      date: user,
    });
  } catch (error) {
    next(error);
  }
};

// module.exports.login = async (req, res) => {
//   try {
//     const user = await authService.login(req.body);
//     res.status(200).json({
//       message: "User logged in successfully",
//       date: user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
