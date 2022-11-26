const PermissinDenied = require('../errors/error/permissinDenied');
const QueryNotFound = require('../errors/error/queryNotfound');
const { ROLE } = require('../../services/prisma');

const CompanyAdminService = require('../../modules/company/service/companyAdmin');

const companyGuard = async (req, res, next) => {
  const companyAdminService = await new CompanyAdminService();

  const currentUserId = parseInt(req.user.data.id);
  const currentUserRole = req.user.data.role;

  if (currentUserRole === ROLE.SUPER_ADMIN) {
    next();
    return;
  }

  const companyId = parseInt(req.query.companyId || req.body.companyId);

  if (!companyId) {
    throw new QueryNotFound('Company not found', 'companyId');
  }

  const companies = await companyAdminService.getCompaniesOfUser(currentUserId);
  const companyIdOfUser = companies.map((c) => c.companyId);

  if (!companyIdOfUser.includes(companyId)) {
    throw new PermissinDenied('You dont have permission for this company');
  }

  next();
};

module.exports = companyGuard;
