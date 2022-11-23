const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedUserRoles() {
  const ROLES = [
    { level: 0, title: 'super_admin' },
    { level: 10, title: 'system_admin' },
  ];

  return await prisma.role.createMany({ data: ROLES });
}

async function seedSalaryHeroAdmin() {
  const superAdminRole = await prisma.role.findFirst({
    where: {
      level: 0,
    },
  });

  const salaryHeroAdmin = {
    is_super_admin: true,
    username: 'salaryhero',
    password: 'salaryhero123',
    firstname: 'salary',
    lastname: 'hero',
    role: {
      connect: {
        id: superAdminRole.id,
      },
    },
  };

  return await prisma.user.create({ data: salaryHeroAdmin });
}

async function seedClientAdmin() {
  const systemAdminRole = await prisma.role.findFirst({
    where: {
      level: 10,
    },
  });

  const clientAdmin = {
    is_super_admin: false,
    username: 'admin',
    password: 'admin123',
    firstname: 'john',
    lastname: 'natacha',
    role: {
      connect: {
        id: systemAdminRole.id,
      },
    },
  };

  return await prisma.user.create({ data: clientAdmin });
}

async function seedCompany() {
  return await prisma.company.create({
    data: {
      name: 'APPLE',
    },
  });
}

async function seedCompanyAdmin(company, clientAdmin) {
  return await prisma.companyAdmin.create({
    data: {
      user: {
        connect: {
          id: clientAdmin.id,
        },
      },
      company: {
        connect: {
          id: company.id,
        },
      },
    },
  });
}

async function seedEmployee(company, clientAdmin) {
  const employees = [
    {
      firstname: 'Doretta',
      lastname: 'Kestrel',
      base_salary: 20000,
      company,
      createdBy: clientAdmin,
    },
    {
      firstname: 'Ernestine',
      lastname: 'Penelope',
      base_salary: 20000,
      company,
      createdBy: clientAdmin,
    },
    {
      firstname: 'Lucy',
      lastname: 'Stefani',
      base_salary: 20000,
      company,
      createdBy: clientAdmin,
    },
  ];

  return employees.forEach(async (employee) => {
    await prisma.employee.create({
      data: {
        firstname: employee.firstname,
        lastname: employee.lastname,
        base_salary: employee.base_salary,
        company: {
          connect: {
            id: employee.company.id,
          },
        },
        created_by: {
          connect: {
            id: employee.createdBy.id,
          },
        },
      },
    });
  });
}

async function main() {
  await seedUserRoles();
  await seedSalaryHeroAdmin();

  const clientAdmin = await seedClientAdmin();
  const company = await seedCompany();

  await seedCompanyAdmin(company, clientAdmin);
  await seedEmployee(company, clientAdmin);
}
main()
  .then(async () => {
    console.log('Your Database has been seeded data !!!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
