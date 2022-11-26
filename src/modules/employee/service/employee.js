const { ROLE } = require('../../../services/prisma');
const { Employee } = require('../../../models');

class EmployeeService {
  async getAll(companyId) {
    const findAllArgs = {
      where: {
        companyId: companyId,
      },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
    };

    return await new Employee().findAll(findAllArgs);
  }

  async createNewEmployee(adminUserId, employeeData) {
    const createArgs = {
      data: {
        baseSalary: employeeData.baseSalary,
        user: {
          create: {
            username: employeeData.username,
            password: employeeData.password,
            firstname: employeeData.firstname,
            lastname: employeeData.lastname,
            role: {
              connect: {
                role: ROLE.EMPLOYEE,
              },
            },
          },
        },
        company: {
          connect: {
            id: employeeData.companyId,
          },
        },
        createdBy: {},
      },
    };

    return await new Employee().create();
  }
}

module.exports = EmployeeService;
