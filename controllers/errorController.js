module.exports = (err, req, res, next) => {
  console.log(err.stack);

  err.status = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
};
