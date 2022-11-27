const { Company } = require('../../../models');
const { ROLE } = require('../../../services/prisma');

class CompanyService {
  async getOne(id, findArgs) {
    return await new Company().find(id, findArgs);
  }

  async getAll(findAllArgs) {
    return await new Company().findAll(findAllArgs);
  }

  async createCompany(createArgs) {
    return await new Company().create(createArgs);
  }

  async updateCompany(id, updateArgs) {
    const company = await Company.init(id);
    return await company.update(updateArgs);
  }

  async removeCompany(id) {
    const company = await Company.init(id);
    return await company.remove();
  }

  async createUserAdminAndAddToCompany(id, userData) {
    const adminRole = ROLE.CLIENT_ADMIN;

    const createNewAdminArgs = {
      data: {
        CompanyAdmin: {
          create: {
            user: {
              create: {
                username: userData.username,
                password: userData.password,
                firstname: userData.firstname,
                lastname: userData.lastname,
                role: {
                  connect: {
                    role: adminRole,
                  },
                },
              },
            },
          },
        },
      },
      include: {
        CompanyAdmin: true,
      },
    };

    const company = await Company.init(id);
    return await company.update(createNewAdminArgs);
  }

  async addUserAdminToCompany(id, userId) {
    const addAdminArgs = {
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
    };

    const company = await Company.init(id);
    return await company.update(addAdminArgs);
  }

  async getAllUsersOf(id) {
    const findArgs = {
      include: {
        Employee: {
          select: {
            userId: true,
          },
        },
        CompanyAdmin: {
          select: {
            userId: true,
          },
        },
      },
    };

    const company = await Company.init(id);

    return await company.find(id, findArgs);
  }
}

module.exports = CompanyService;
