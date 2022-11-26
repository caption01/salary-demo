const PermissinDenied = require('../errors/error/permissinDenied');
const CompanyAdminService = require('../../modules/company/service/companyAdmin');

const companyGuard = async (req, res, next) => {
  const companyAdminService = await new CompanyAdminService();

  const currentUserId = parseInt(req.user.data.id);
  const companyId = parseInt(req.query.companyId);

  const companies = await companyAdminService.getCompaniesOfUser(currentUserId);
  const companyIdOfUser = companies.map((c) => c.companyId);

  if (!companyIdOfUser.includes(companyId)) {
    throw new PermissinDenied('You dont have permission for this company');
  }

  next();
};

module.exports = companyGuard;
