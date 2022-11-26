const { prisma } = require('../services/prisma');

class Role {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(enumRole) {
    const role = await prisma.role.findFirst({
      where: {
        role: enumRole,
      },
    });

    if (!role) {
      return null;
    }

    return new Role(role);
  }
}

module.exports = Role;
