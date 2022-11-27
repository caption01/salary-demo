const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  CLIENT_ADMIN: 'CLIENT_ADMIN',
  EMPLOYEE: 'EMPLOYEE',
};

module.exports = { prisma, ROLE, PrismaClient, Prisma };
