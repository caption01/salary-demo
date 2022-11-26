const { CompanyAdmin, Employee } = require('../../../models');

class CompanyAdminService {
  async isAlreadyAdmin(userId, companyId) {
    const findAdminInCompanyArgs = {
      where: {
        user_id: userId,
        company_id: companyId,
      },
    };

    return await new CompanyAdmin().find(findAdminInCompanyArgs);
  }

  async getCompaniesOfUser(userId) {
    const findAllArgs = {
      where: {
        user_id: userId,
      },
      include: {
        company: true,
      },
    };

    return await new CompanyAdmin().findAll(findAllArgs);
  }
}

module.exports = CompanyAdminService;
