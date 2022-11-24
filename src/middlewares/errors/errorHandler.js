const CustomError = require('./error/customError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.log('please update error handler', err.message);

  return res.status(400).send({
    errors: [{ message: err.message }],
  });
};

module.exports = errorHandler;
