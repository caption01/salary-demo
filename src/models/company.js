const { prisma } = require('../services/prisma');

class Company {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(id) {
    const company = await prisma.company.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!company) {
      new Company(null);
      return null;
    }

    return new Company(company);
  }

  async find(id) {
    return await prisma.company.findFirst({ where: { id: id } });
  }

  async findAll() {
    return await prisma.company.findMany();
  }

  async create(data) {
    return await prisma.company.create({ data });
  }

  async update(data) {
    const companyId = this.self.id;
    return await prisma.company.update({
      where: { id: companyId },
      data: data,
    });
  }

  async remove() {
    const companyId = this.self.id;
    return await prisma.company.delete({ where: { id: companyId } });
  }

  async addClientAdmin(user) {}
}

module.exports = Company;
