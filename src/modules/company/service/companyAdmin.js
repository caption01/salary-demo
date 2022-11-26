const { CompanyAdmin } = require('../../../models');

class CompanyAdminService {
  async isAlreadyAdmin(userId, companyId) {
    const findAdminInCompanyArgs = {
      where: {
        userId: userId,
        companyId: companyId,
      },
    };

    return await new CompanyAdmin().find(findAdminInCompanyArgs);
  }

  async getCompaniesOfUser(userId) {
    const findAllArgs = {
      where: {
        userId: userId,
      },
      include: {
        company: true,
      },
    };

    return await new CompanyAdmin().findAll(findAllArgs);
  }
}

module.exports = CompanyAdminService;
