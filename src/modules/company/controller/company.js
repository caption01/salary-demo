const QueryNotFound = require('../../../middlewares/errors/error/queryNotfound');
const CompanyService = require('../service/company');

async function getAllCompany(req, res) {
  const companies = await new CompanyService().getAll();
  res.json({ data: companies });
}

async function getCompany(req, res) {
  const id = req.params.id;
  const company = await new CompanyService().getOne(parseInt(id));

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  return res.json({ data: company });
}

async function createCompany(req, res) {
  const body = req.body;
  const companyData = { name: body.name };

  const company = await new CompanyService().createCompany(companyData);

  res.json({ success: true, data: company });
}

async function updateCompany(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;
  const companyData = { name: body.name };

  const service = new CompanyService();

  let company = await service.getOne(id);

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  company = await service.updateCompany(id, companyData);

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

async function addClientCompany(req, res) {
  const id = req.params.id;
  const user = req.body;

  let company = await Company.init(parseInt(id));

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }
}

module.exports = {
  getAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  addClientCompany,
};
