const CustomError = require('./customError');

class PermissinDenied extends CustomError {
  statusCode = 403;

  constructor() {
    super('Permissin Denied');
    Object.setPrototypeOf(this, PermissinDenied.prototype);
  }

  serializeErrors() {
    return [
      {
        message: 'Permissin Denied',
      },
    ];
  }
}

module.exports = PermissinDenied;
