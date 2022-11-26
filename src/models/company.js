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
    return await prisma.company.findFirst({
      where: { id: id },
      include: { Employee: true, CompanyAdmin: true },
    });
  }

  async findAll() {
    return await prisma.company.findMany({
      include: { Employee: true, CompanyAdmin: true },
    });
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

  async addAdmin(userId) {
    const companyId = this.self.id;
    return await prisma.company.update({
      where: { id: companyId },
      data: {
        CompanyAdmin: {
          create: {
            user: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
    });
  }

  async createNewAdmin(user) {
    const companyId = this.self.id;
    return await prisma.company.update({
      where: { id: companyId },
      data: {
        CompanyAdmin: {
          create: {
            user: {
              create: {
                username: user.username,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                role: {
                  connect: {
                    role: user.role,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}

module.exports = Company;
