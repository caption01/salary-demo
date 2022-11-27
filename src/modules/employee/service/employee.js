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

  async getOne(employeeId, companyId) {
    const findArgs = {
      where: {
        id: employeeId,
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

    return await new Employee().fineOne(findArgs);
  }

  async createNewEmployee(employeeData) {
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
        createdBy: {
          connect: {
            id: employeeData.createdById,
          },
        },
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

    return await new Employee().create(createArgs);
  }

  async updateEmployee(id, employeeData) {
    const updateArgs = {
      data: {
        baseSalary: employeeData.baseSalary,
        user: {
          update: {
            username: employeeData.username,
            password: employeeData.password,
            firstname: employeeData.firstname,
            lastname: employeeData.lastname,
          },
        },
        company: {
          connect: {
            id: employeeData.companyId,
          },
        },
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

    const employee = await Employee.init(id);
    return await employee.update(updateArgs);
  }

  async removeEmployee(id) {
    const employee = await Employee.init(id);
    return await employee.remove();
  }
}

module.exports = EmployeeService;
