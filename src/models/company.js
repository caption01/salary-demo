const { prisma } = require('../services/prisma');

class Company {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(id) {
    const company = await prisma.company.findFirst({
      where: {
        id: id,
      },
    });

    if (!company) {
      return null;
    }

    return new Company(company);
  }

  async find(findArgs) {
    return await prisma.company.findFirst(findArgs);
  }

  async findAll(findAllArgs) {
    return await prisma.company.findMany(findAllArgs);
  }

  async create(createArgs) {
    return await prisma.company.create(createArgs);
  }

  async update(updateArgs) {
    const companyId = this.self.id;
    return await prisma.company.update({
      where: { id: companyId },
      ...updateArgs,
    });
  }

  async remove() {
    const companyId = this.self.id;
    return await prisma.company.delete({ where: { id: companyId } });
  }
}

module.exports = Company;
