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

  async isCanUpsert(userData) {
    const findAllArgs = {
      where: {
        username: userData.username,
      },
    };

    const users = await new User().findAll(findAllArgs);
    const canNotUpsert = !users || users.length > 1;

    return !canNotUpsert;
  }
}

module.exports = UserService;
