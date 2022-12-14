const QueryNotfound = require('../../../middlewares/errors/error/queryNotfound');
const { signJwt } = require('../../../services/jwt');
const UserService = require('../service/user');

async function signin(req, res, next) {
  const userService = new UserService();

  const body = req.body;

  const findArgs = {
    where: { username: body.username },
    include: { role: { select: { id: true, level: true, role: true } } },
  };

  const user = await userService.getOne(findArgs);

  if (!user) {
    throw new QueryNotfound('user not found', 'username');
  }

  if (body.password !== user.password) {
    throw new QueryNotfound('password not correct');
  }

  const userData = {
    id: user.id,
    isSuperAdmin: user.isSuperAdmin,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role.role,
    roleLevel: user.role.level,
  };

  const token = signJwt(userData);

  res.json({ accessToken: token });
}

module.exports = {
  signin,
};
