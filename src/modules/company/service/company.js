const { prisma } = require('../../../services/prisma');

class Company {
  self = null;

  constructor(self) {
    this.self = self;
  }

  static async init(id) {
    const company = await prisma.company.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!company) {
      return null;
    }

    return new Company(company);
  }

  static async create(data) {
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
}

module.exports = Company;
