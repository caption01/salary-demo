const { CompanyAdmin } = require('../../../models');

class CompanyAdminService {
  async isAlreadyAdmin(userId, companyId) {
    return await new CompanyAdmin().findAdminInCompany(userId, companyId);
  }
}

module.exports = CompanyAdminService;
