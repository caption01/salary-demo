const { User } = require('../../../models');

class UserService {
  async getOne(args) {
    return await new User().find(args);
  }

  async isUserUnique(userData) {
    const args = {
      where: {
        username: userData.username,
        password: userData.password,
        firstname: userData.firstname,
        lastname: userData.lastname,
      },
    };

    const foundUser = Boolean(await new User().find(args));

    return !foundUser;
  }
}

module.exports = UserService;
