const PermissinDenied = require('../errors/error/permissinDenied');

const roleGuard = (requireRole) => (req, res, next) => {
  let requiredRoles = [];

  if (typeof requireRole === 'string') {
    requiredRoles = [requireRole];
  }

  if (Array.isArray(requireRole)) {
    requiredRoles = [...requireRole];
  }

  const user = req.user.data;
  const userRole = user.role;

  if (!requiredRoles.includes(userRole)) {
    throw new PermissinDenied();
  }

  next();
};

module.exports = roleGuard;
