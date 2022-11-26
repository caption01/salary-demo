const { body, validationResult } = require('express-validator');

const { prisma } = require('../../../services/prisma');
const QueryNotFound = require('../../../middlewares/errors/error/queryNotfound');

const Company = require('../service/company');

async function getAllCompany(req, res) {
  const companies = await prisma.company.findMany();
  res.json({ data: companies });
}

async function getCompany(req, res) {
  const id = req.params.id;
  const company = await Company.init(id);

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  return res.json({ data: company.self });
}

async function createCompany(req, res) {
  const body = req.body;
  const companyData = { name: body.name };

  const company = await Company.create(companyData);

  res.json({ data: company, success: true });
}

async function updateCompany(req, res) {
  const id = req.params.id;
  const body = req.body;
  const companyData = { name: body.name };

  let company = await Company.init(id);

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  company = await company.update(companyData);

  res.json({ success: true, data: company });
}

async function deleteCompany(req, res) {
  const id = req.params.id;

  let company = await Company.init(id);

  if (!company) {
    throw new QueryNotFound('company not found', 'id');
  }

  await company.remove();

  res.json({ success: true, data: { id: company.self.id } });
}

module.exports = {
  getAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
