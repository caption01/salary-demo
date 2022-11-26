const PermissinDenied = require('../errors/error/permissinDenied');

const roleGuard = (requireRole) => (req, res, next) => {
  const user = req.user.data;
  const userRole = user.role;

  if (userRole !== requireRole) {
    throw new PermissinDenied();
  }

  next();
};

module.exports = roleGuard;
