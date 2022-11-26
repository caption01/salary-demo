const { Company } = require('../../../models');

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
}

module.exports = CompanyService;
