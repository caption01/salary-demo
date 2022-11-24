const CustomError = require('./customError');

class QueryNotFound extends CustomError {
  statusCode = 404;

  constructor(message, field) {
    super(message);
    Object.setPrototypeOf(this, QueryNotFound.prototype);

    this.field = field;
  }

  serializeErrors() {
    return [
      {
        message: this.message,
        field: this.field,
      },
    ];
  }
}

module.exports = QueryNotFound;
