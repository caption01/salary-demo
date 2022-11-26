const { prisma } = require('../services/prisma');

class User {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(id) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      return null;
    }

    return new User(user);
  }

  async find(findArgs) {
    return await prisma.user.findFirst(findArgs);
  }

  async findAll(findAllArgs) {
    return await prisma.user.findMany(findAllArgs);
  }

  async create(createArgs) {
    return await prisma.user.create(createArgs);
  }

  async update(updateArgs) {
    const userId = this.self.id;
    return await prisma.user.update({
      where: { id: userId },
      ...updateArgs,
    });
  }

  async remove() {
    const userId = this.self.id;
    return await prisma.user.delete({ where: { id: userId } });
  }
}

module.exports = User;
