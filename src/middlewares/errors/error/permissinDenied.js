const CustomError = require('./customError');

class PermissinDenied extends CustomError {
  statusCode = 403;
  message = '';

  constructor(message = 'Permissin Denied') {
    super(message);
    Object.setPrototypeOf(this, PermissinDenied.prototype);
    this.message = message;
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

module.exports = PermissinDenied;
