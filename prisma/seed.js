const { PrismaClient } = require('@prisma/client');

const { ROLE } = require('../src/services/prisma');
const { convertDateStringToIso } = require('../src/utils/moment');

const prisma = new PrismaClient();

async function seedUserRoles() {
  const roles = [
    { level: 1, title: 'superAdmin', role: ROLE.SUPER_ADMIN },
    { level: 10, title: 'clientAdmin', role: ROLE.CLIENT_ADMIN },
    { level: 100, title: 'employee', role: ROLE.EMPLOYEE },
  ];

  return await prisma.role.createMany({ data: roles });
}

async function seedSalaryHeroAdmin() {
  const superAdminRole = await prisma.role.findFirst({
    where: {
      role: ROLE.SUPER_ADMIN,
    },
  });

  const salaryHeroAdmin = {
    isSuperAdmin: true,
    username: 'salaryhero',
    password: 'salaryhero_123',
    firstname: 'salaryhero_f',
    lastname: 'salaryhero_l',
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
      role: ROLE.CLIENT_ADMIN,
    },
  });

  const clientAdmin = {
    isSuperAdmin: false,
    username: 'apple_admin1',
    password: 'apple_admin1_123',
    firstname: 'apple_admin1_f',
    lastname: 'apple_admin1_l',
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

async function seedEmployees(company, clientAdmin) {
  const employeeRole = await prisma.role.findFirst({
    where: {
      role: ROLE.EMPLOYEE,
    },
  });

  const employees = [
    {
      firstname: 'apple_employee1_f',
      lastname: 'apple_employee1_l',
      username: 'apple_employee1',
      password: 'apple_employee1_123',
      baseSalary: 20000,
      company: company,
      createdBy: clientAdmin.userId,
    },
    {
      firstname: 'apple_employee2_f',
      lastname: 'apple_employee2_l',
      username: 'apple_employee2',
      password: 'apple_employee2_123',
      baseSalary: 30000,
      company: company,
      createdBy: clientAdmin.userId,
    },
    {
      firstname: 'apple_employee3_f',
      lastname: 'apple_employee3_l',
      username: 'apple_employee3',
      password: 'apple_employee3_123',
      baseSalary: 40000,
      company: company,
      createdBy: clientAdmin.userId,
    },
  ];

  return new Promise(async (resolve, reject) => {
    let newEmployee = [];

    for (let employee of employees) {
      const newEm = await prisma.employee.create({
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

      newEmployee.push(newEm);
    }

    resolve(newEmployee);
  });
}

async function seedTransferRequest(employee) {
  const mockTransfer = [
    {
      employee: employee,
      date: '2022-10-05',
      amount: 1500,
    },
    {
      employee: employee,
      date: '2022-10-06',
      amount: 1500,
    },
    {
      employee: employee,
      date: '2022-11-05',
      amount: 2500,
    },
    {
      employee: employee,
      date: '2022-11-06',
      amount: 2500,
    },
    {
      employee: employee,
      date: '2022-12-05',
      amount: 8000,
    },
  ];

  for (let transfer of mockTransfer) {
    await prisma.transferRequest.create({
      data: {
        amount: transfer.amount,
        companyId: transfer.employee.companyId,
        employeeId: transfer.employee.id,
        date: convertDateStringToIso(transfer.date),
      },
    });
  }
}

async function main() {
  await seedUserRoles();
  await seedSalaryHeroAdmin();

  const clientAdmin = await seedClientAdmin();
  const company = await seedCompany();

  const companyAdmin = await seedCompanyAdmin(company, clientAdmin);
  const employees = await seedEmployees(company, companyAdmin);

  for (let employee of employees) {
    await seedTransferRequest(employee);
  }
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
