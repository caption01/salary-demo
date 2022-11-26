const { prisma } = require('../services/prisma');

class CompanyAdmin {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(id) {
    const companyAdmin = await prisma.companyAdmin.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!companyAdmin) {
      new CompanyAdmin(null);
      return null;
    }

    return new CompanyAdmin(companyAdmin);
  }

  async find(id) {
    return await prisma.companyAdmin.findFirst({ where: { id: id } });
  }

  async findAll() {
    return await prisma.companyAdmin.findMany();
  }

  async create(data) {
    return await prisma.companyAdmin.create({ data });
  }

  async update(data) {
    const companyAdminId = this.self.id;
    return await prisma.companyAdmin.update({
      where: { id: companyAdminId },
      data: data,
    });
  }

  async remove() {
    const companyAdminId = this.self.id;
    return await prisma.companyAdmin.delete({ where: { id: companyAdminId } });
  }

  async findAdminInCompany(userId, companyId) {
    return await prisma.companyAdmin.findFirst({
      where: {
        user_id: userId,
        company_id: companyId,
      },
    });
  }
}

module.exports = CompanyAdmin;
