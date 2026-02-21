module.exports = (
  res,
  {
    statusCode = 200,
    message = "Request successful",
    data = null,
    meta = null,
  },
) => {
  const response = {
    status: "success",
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};
