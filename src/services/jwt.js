const jwt = require('jsonwebtoken');

const JwtErrors = require('../middlewares/errors/error/jwtErrors');

const secret = process.env.APP_SECRET;

function signJwt(data = {}) {
  return jwt.sign(
    {
      data: data,
    },
    secret,
    { expiresIn: '3h' }
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

module.exports = {
  jwt,
  secret,
  signJwt,
  verifyJwt,
  JwtErrors,
};
