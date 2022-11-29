const QueryNotFound = require('../../../middlewares/errors/error/queryNotfound');
const CompanyService = require('../service/company');
const CompanyAdminService = require('../service/companyAdmin');
const UserService = require('../../signin/service/user');

async function getAllCompany(req, res) {
  const companyService = await new CompanyService();

  const companies = await companyService.getAll({
    include: { Employee: true, CompanyAdmin: true },
  });

  res.json({ data: companies });
}

async function getCompany(req, res) {
  const companyService = await new CompanyService();

  const companyId = parseInt(req.params.companyId);

  const company = await companyService.getOne(companyId, {
    include: { Employee: true, CompanyAdmin: true },
  });

  if (!company) {
    throw new QueryNotFound('company not found', 'companyId');
  }

  return res.json({ data: company });
}

async function createCompany(req, res) {
  const companyService = await new CompanyService();

  const body = req.body;

  const companyData = {
    name: body.name,
  };

  const valid = await companyService.isCompanyNameValid(companyData.name);

  if (!valid) {
    throw new Error('Company name must unique');
  }

  const company = await companyService.createCompany(companyData);

  res.json({ success: true, data: company });
}

async function updateCompany(req, res) {
  const service = new CompanyService();

  const companyId = parseInt(req.params.companyId);

  let company = await service.getOne(companyId);

  if (!company) {
    throw new QueryNotFound('company not found', 'companyId');
  }

  const body = req.body;

  const companyData = {
    name: body.name,
  };

  company = await service.updateCompany(companyId, companyData);

  res.json({ success: true, data: company });
}

async function deleteCompany(req, res) {
  const service = await new CompanyService();

  const companyId = parseInt(req.params.companyId);

  let company = await service.getOne(companyId);

  if (!company) {
    throw new QueryNotFound('company not found', 'companyId');
  }

  company = await service.removeCompany(companyId);

  res.json({ success: true, data: { id: company.id } });
}

async function addClientAdminCompany(req, res) {
  const companyService = new CompanyService();
  const userService = new UserService();

  const companyId = parseInt(req.params.companyId);
  const userData = req.body;

  let company = await companyService.getOne(companyId);

  if (!company) {
    throw new QueryNotFound('company not found', 'companyId');
  }

  const isUniqe = await userService.isUserUnique(userData);

  if (!isUniqe) {
    throw new Error('user data must be unique');
  }

  company = await companyService.createUserAdminAndAddToCompany(
    companyId,
    userData
  );

  return res.json({
    success: true,
    message: 'new admin are added to company',
    data: company,
  });
}

module.exports = {
  getAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  addClientAdminCompany,
};
