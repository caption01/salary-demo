const { Company, User, Role } = require('../../../models');
const { ROLE } = require('../../../services/prisma');

class CompanyService {
  async getOne(id) {
    return await new Company().find(id);
  }

  async getAll() {
    return await new Company().findAll();
  }

  async createCompany(data) {
    return await new Company().create(data);
  }

  async updateCompany(id, data) {
    const company = await Company.init(id);
    return await company.update(data);
  }

  async removeCompany(id) {
    const company = await Company.init(id);
    return await company.remove();
  }

  async addUserAdminToCompany(id, userId) {
    const company = await Company.init(id);
    return await company.addAdmin(userId);
  }

  async createUserAdminAndAddToCompany(id, userData) {
    const adminRole = ROLE.CLIENT_ADMIN;

    const company = await Company.init(id);

    const user = {
      username: userData.username,
      password: userData.password,
      firstname: userData.firstname,
      lastname: userData.lastname,
      role: adminRole,
    };

    return await company.createNewAdmin(user);
  }
}

module.exports = CompanyService;
