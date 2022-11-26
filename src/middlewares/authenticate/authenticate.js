const { jwt, JwtErrors, secret } = require('../../services/jwt');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    throw new JwtErrors('You dont have permission', 401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      throw new JwtErrors(err.message, 403);
    }

    req.user = user;

    next();
  });
}

module.exports = authenticate;
