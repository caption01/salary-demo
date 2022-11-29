const { User } = require('../../../models');

class UserService {
  async getOne(args) {
    return await new User().find(args);
  }

  async isUserUnique(userData) {
    const findArgs = {
      where: {
        username: userData.username,
      },
    };

    const foundUser = Boolean(await new User().find(findArgs));

    return !foundUser;
  }
}

module.exports = UserService;
