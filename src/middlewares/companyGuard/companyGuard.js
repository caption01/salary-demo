const { map, isEmpty } = require('lodash');

const PermissinDenied = require('../errors/error/permissinDenied');
const QueryNotFound = require('../errors/error/queryNotfound');
const { ROLE } = require('../../services/prisma');
const CompanyService = require('../../modules/company/service/company');

function getUserIds(companyData = {}) {
  let userIds = [];

  const employee = companyData['Employee'];
  const companyAdmin = companyData['CompanyAdmin'];

  if (!isEmpty(employee)) {
    let ids = map(employee, (e) => e.userId);
    userIds = [...userIds, ...ids];
  }

  if (!isEmpty(companyAdmin)) {
    let ids = map(companyAdmin, (e) => e.userId);
    userIds = [...userIds, ...ids];
  }

  return [...new Set(userIds)];
}

const companyGuard = async (req, res, next) => {
  const companyService = await new CompanyService();

  const currentUserId = parseInt(req.user.data.id);
  const currentUserRole = req.user.data.role;
  const companyId = parseInt(req.params.companyId);

  const company = await companyService.getOne(companyId);

  if (!company) {
    throw new QueryNotFound('Company not found', 'companyId');
  }

  if (currentUserRole === ROLE.SUPER_ADMIN) {
    next();
    return;
  }

  const companyData = await companyService.getAllUsersOf(companyId);

  const userIds = getUserIds(companyData);

  if (!userIds.includes(currentUserId)) {
    throw new PermissinDenied('You dont have permission for this company');
  }

  next();
};

module.exports = companyGuard;
