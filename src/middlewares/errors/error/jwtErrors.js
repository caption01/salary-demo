const CustomError = require('./customError');

class JwtErrors extends CustomError {
  statusCode = 401;

  constructor(message, status) {
    super(message);
    Object.setPrototypeOf(this, JwtErrors.prototype);
    this.statusCode = status;
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

module.exports = JwtErrors;
