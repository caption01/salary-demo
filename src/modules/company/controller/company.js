const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllCompany(req, res) {
  const companies = await prisma.company.findMany();
  res.json({ data: companies });
}

module.exports = {
  getAllCompany,
};
