const errorHandler = (err, req, res, next) => {
// console.log(err.name);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Внутренняя ошибка сервера' : err.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
