module.exports = (err, req, res, next) => {
  console.error("ERROR 💥", err);

  //Handle Postgres unique constraint violation
  if (err.code === "23505") {
    return res.status(400).json({
      status: "fail",
      message: "Data already exists in the database",
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: err.status || "error",
    message: err.message || "Something went wrong in the Server!",
  });
};
