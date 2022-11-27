const PermissinDenied = require('../errors/error/permissinDenied');
const QueryNotFound = require('../errors/error/queryNotfound');
const { ROLE } = require('../../services/prisma');

const CompanyAdminService = require('../../modules/company/service/companyAdmin');
const CompanyService = require('../../modules/company/service/company');

const companyGuard = async (req, res, next) => {
  const companyAdminService = await new CompanyAdminService();

  const currentUserId = parseInt(req.user.data.id);
  const currentUserRole = req.user.data.role;
  const companyId = parseInt(req.params.companyId);

  const company = await new CompanyService().getOne(companyId);

  if (!company) {
    throw new QueryNotFound('Company not found', 'companyId');
  }

  if (currentUserRole === ROLE.SUPER_ADMIN) {
    next();
    return;
  }

  const companies = await companyAdminService.getCompaniesOfUser(currentUserId);
  const companyIdOfUser = companies.map((c) => c.companyId);

  if (!companyIdOfUser.includes(companyId)) {
    throw new PermissinDenied('You dont have permission for this company');
  }

  next();
};

module.exports = companyGuard;
