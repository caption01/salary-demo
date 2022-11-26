const { prisma } = require('../services/jwt');

class User {
  self = null;

  constructor(self) {
    this.self = self;
  }

  static async init(id) {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return null;
    }

    return new User(user);
  }

  static async create(data) {
    return await prisma.user.create({ data });
  }

  async update(data) {
    const userId = this.self.id;
    return await prisma.company.update({
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
