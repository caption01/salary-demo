const QueryNotFound = require('../../../middlewares/errors/error/queryNotfound');
const CompanyService = require('../service/company');
const CompanyAdminService = require('../service/companyAdmin');
const UserService = require('../../signin/service/user');

async function getAllCompany(req, res) {
  const companies = await new CompanyService().getAll({
    include: { Employee: true, CompanyAdmin: true },
  });

  res.json({ data: companies });
}

async function getCompany(req, res) {
  const id = parseInt(req.params.id);
  const company = await new CompanyService().getOne(id, {
    include: { Employee: true, CompanyAdmin: true },
  });

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  return res.json({ data: company });
}

async function createCompany(req, res) {
  const body = req.body;
  const createArgs = { data: { name: body.name } };

  const company = await new CompanyService().createCompany(createArgs);

  res.json({ success: true, data: company });
}

async function updateCompany(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;
  const updateArgs = { data: { name: body.name } };

  const service = new CompanyService();

  let company = await service.getOne(id);

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  company = await service.updateCompany(id, updateArgs);

  res.json({ success: true, data: company });
}

async function deleteCompany(req, res) {
  const id = parseInt(req.params.id);

  let service = await new CompanyService();

  let company = await service.getOne(id);

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  company = await service.removeCompany(id);

  res.json({ success: true, data: { id: company.id } });
}

async function addClientAdminCompany(req, res) {
  const companyId = parseInt(req.params.id);
  const { id, ...userData } = req.body;
  const userId = parseInt(id);

  const companyService = new CompanyService();
  const companyAdminService = new CompanyAdminService();
  const userService = new UserService();

  let company = await companyService.getOne(companyId);

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  if (!userId) {
    const isUniqe = await userService.isUserUnique(userData);

    if (!isUniqe) {
      throw new Error('user data must be unique');
    }

    await companyService.createUserAdminAndAddToCompany(companyId, userData);
    return res.json({ success: true, data: 'new admin are added to company' });
  }

  let companyAdmin = await companyAdminService.isAlreadyAdmin(
    userId,
    companyId
  );

  if (companyAdmin) {
    throw new Error('This user are admin in this company already.');
  }

  await companyService.addUserAdminToCompany(companyId, userId);

  res.json({ success: true, data: 'admin are added to company' });
}

module.exports = {
  getAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  addClientAdminCompany,
};
