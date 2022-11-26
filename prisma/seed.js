const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedUserRoles() {
  const roles = [
    { level: 1, title: 'superAdmin', role: 'SUPER_ADMIN' },
    { level: 10, title: 'clientAdmin', role: 'CLIENT_ADMIN' },
    { level: 100, title: 'employee', role: 'EMPLOYEE' },
  ];

  return await prisma.role.createMany({ data: roles });
}

async function seedSalaryHeroAdmin() {
  const superAdminRole = await prisma.role.findFirst({
    where: {
      role: 'SUPER_ADMIN',
    },
  });

  const salaryHeroAdmin = {
    isSuperAdmin: true,
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
  const clientAdminRole = await prisma.role.findFirst({
    where: {
      role: 'CLIENT_ADMIN',
    },
  });

  const clientAdmin = {
    isSuperAdmin: false,
    username: 'admin',
    password: 'admin123',
    firstname: 'john',
    lastname: 'natacha',
    role: {
      connect: {
        id: clientAdminRole.id,
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
  const employeeRole = await prisma.role.findFirst({
    where: {
      role: 'EMPLOYEE',
    },
  });

  const employees = [
    {
      firstname: 'Doretta',
      lastname: 'Kestrel',
      username: 'doretta',
      password: '1111',
      baseSalary: 20000,
      company: company,
      createdBy: clientAdmin.userId,
    },
    {
      firstname: 'Ernestine',
      lastname: 'Penelope',
      username: 'ernestine',
      password: '2222',
      baseSalary: 20000,
      company: company,
      createdBy: clientAdmin.userId,
    },
    {
      firstname: 'Lucy',
      lastname: 'Stefani',
      username: 'lucy',
      password: '3333',
      baseSalary: 20000,
      company: company,
      createdBy: clientAdmin.userId,
    },
  ];

  return employees.forEach(async (employee) => {
    await prisma.employee.create({
      data: {
        baseSalary: employee.baseSalary,
        user: {
          create: {
            username: employee.username,
            password: employee.password,
            firstname: employee.firstname,
            lastname: employee.lastname,
            role: {
              connect: {
                id: employeeRole.id,
              },
            },
          },
        },
        company: {
          connect: {
            id: employee.company.id,
          },
        },
        createdBy: {
          connect: {
            id: employee.createdBy,
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

  const companyAdmin = await seedCompanyAdmin(company, clientAdmin);
  await seedEmployee(company, companyAdmin);
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
