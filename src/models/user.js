const { prisma } = require('../services/prisma');

class User {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(id) {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      new user(null);
      return null;
    }

    return new User(user);
  }

  async find(id) {
    return await prisma.user.findFirst({ where: { id: id } });
  }

  async findWith(findArgs) {
    return await prisma.user.findFirst(findArgs);
  }

  async findAll() {
    return await prisma.user.findMany();
  }

  async create(data) {
    return await prisma.user.create({ data });
  }

  async update(data) {
    const userId = this.self.id;
    return await prisma.user.update({
      where: { id: userId },
      data: data,
    });
  }

  async remove() {
    const userId = this.self.id;
    return await prisma.user.delete({ where: { id: userId } });
  }
}

module.exports = User;
