const { Company } = require('../../../models');
const { ROLE } = require('../../../services/prisma');

class CompanyService {
  async getOne(id, includeArgs) {
    const findArgs = {
      where: {
        id: id,
      },
      ...includeArgs,
    };
    return await new Company().find(findArgs);
  }

  async getAll(findAllArgs) {
    return await new Company().findAll(findAllArgs);
  }

  async isCompanyNameValid(companyName) {
    const findArgs = {
      where: {
        name: {
          equals: companyName,
        },
      },
    };

    const found = await new Company().find(findArgs);

    return !found;
  }

  async createCompany(companyData) {
    const createArgs = {
      data: { name: companyData.name },
    };

    return await new Company().create(createArgs);
  }

  async updateCompany(id, companyData) {
    const updateArgs = { data: { name: companyData.name } };

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
