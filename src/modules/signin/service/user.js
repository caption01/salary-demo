const { prisma } = require('../../../services/prisma');
const { User } = require('../../../models');

class UserService {
  async isUserExist(user) {
    const userId = user.id;

    if (userId) {
      return await new User().find(id);
    }

    const data = {
      where: {
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };

    return await new User().findWith(data);
  }
}

module.exports = UserService;
