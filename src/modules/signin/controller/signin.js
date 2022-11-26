const { prisma } = require('../../../services/prisma');
const QueryNotfound = require('../../../middlewares/errors/error/queryNotfound');
const { signJwt } = require('../../../services/jwt');
const UserService = require('../service/user');

async function signin(req, res, next) {
  const body = req.body;

  const userService = new UserService();

  const user = await userService.getOne({
    where: { username: body.username },
    include: { role: { select: { id: true, level: true, role: true } } },
  });

  if (!user) {
    throw new QueryNotfound('user not found', 'username');
  }

  if (body.password !== user.password) {
    throw new QueryNotfound('password not correct');
  }

  const userData = {
    id: user.id,
    is_super_admin: user.is_super_admin,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role.role,
    role_level: user.role.level,
  };

  const token = signJwt(userData);

  res.json({ access_token: token });
}

module.exports = {
  signin,
};
