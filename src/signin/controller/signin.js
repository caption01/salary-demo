const prisma = require('../../services/prisma');
const QueryNotfound = require('../../middlewares/errors/error/queryNotfound');

const signin = (req, res) => {
  const body = req.body;

  const user = prisma.user.findFirst({ where: { username: body.username } });

  if (!user) {
    throw new QueryNotfound('user not found');
  }

  res.json({ message: 'I am superAdmin !!' });
};

module.exports = {
  signin,
};
