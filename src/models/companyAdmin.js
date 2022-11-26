const { prisma } = require('../services/prisma');

class CompanyAdmin {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(id) {
    const companyAdmin = await prisma.companyAdmin.findFirst({
      where: {
        id: id,
      },
    });

    if (!companyAdmin) {
      return null;
    }

    return new CompanyAdmin(companyAdmin);
  }

  async find(findArgs) {
    return await prisma.companyAdmin.findFirst(findArgs);
  }

  async findAll(findAllArgs) {
    return await prisma.companyAdmin.findMany(findAllArgs);
  }

  async create(createArgs) {
    return await prisma.companyAdmin.create(createArgs);
  }

  async update(updateArgs) {
    const companyAdminId = this.self.id;
    return await prisma.companyAdmin.update({
      where: { id: companyAdminId },
      ...updateArgs,
    });
  }

  async remove() {
    const companyAdminId = this.self.id;
    return await prisma.companyAdmin.delete({ where: { id: companyAdminId } });
  }
}

module.exports = CompanyAdmin;
