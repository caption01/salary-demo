const { ROLE } = require('../../../services/prisma');
const { Employee, User } = require('../../../models');

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

  async getOneByEmployeeId(employeeId, companyId) {
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

  async getOneByUserId(userId, companyId) {
    const findArgs = {
      where: {
        userId: userId,
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

  async getEmployeeId(employee) {
    const notfoundId = 9999999;

    const user = await new User().find({
      where: {
        username: employee.username,
      },
      select: {
        EmployeeUser: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return notfoundId;
    }

    return user.EmployeeUser[0].id;
  }

  async importEmployees(employees = [], companyId, createdById) {
    return await employees.map(async (employee) => {
      const employeeId = await this.getEmployeeId(employee);

      const upsertArgs = {
        where: {
          id: employeeId,
        },
        create: {
          baseSalary: employee.baseSalary,
          user: {
            create: {
              username: employee.username,
              password: employee.password,
              firstname: employee.firstname,
              lastname: employee.lastname,
              role: {
                connect: {
                  role: ROLE.EMPLOYEE,
                },
              },
            },
          },
          company: {
            connect: {
              id: companyId,
            },
          },
          createdBy: {
            connect: {
              id: createdById,
            },
          },
        },
        update: {
          baseSalary: employee.baseSalary,
          user: {
            update: {
              username: employee.username,
              password: employee.password,
              firstname: employee.firstname,
              lastname: employee.lastname,
            },
          },
          company: {
            connect: {
              id: companyId,
            },
          },
          createdBy: {
            connect: {
              id: createdById,
            },
          },
        },
      };

      return await new Employee().upsert(upsertArgs);
    });
  }
}

module.exports = EmployeeService;
