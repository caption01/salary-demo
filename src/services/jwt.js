const jwt = require('jsonwebtoken');

const jwtErrors = require('../middlewares/errors/error/jwtErrors');

const secret = process.env.APP_SECRET;

function signJwt(data = {}) {
  return jwt.sign(
    {
      data: data,
    },
    secret,
    { expiresIn: '1h' }
  );
}

function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, data: decoded, error: null };
  } catch (error) {
    return { valid: false, data: null, error: error };
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    throw new jwtErrors('You dont have permission', 401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      throw new jwtErrors(err.message, 403);
    }

    req.user = user;

    next();
  });
}

module.exports = {
  jwt,
  secret,
  signJwt,
  verifyJwt,
  authenticateToken,
};
