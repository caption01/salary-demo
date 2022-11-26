const { prisma } = require('../services/prisma');

class Employee {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(id) {
    const employee = await prisma.employee.findFirst({
      where: {
        id: id,
      },
    });

    if (!employee) {
      return null;
    }

    return new Employee(employee);
  }

  async findAll(findAllArgs) {
    return await prisma.employee.findMany(findAllArgs);
  }

  async fineOne(fineOneArgs) {
    return await prisma.employee.findFirst(fineOneArgs);
  }

  async create(createArgs) {
    return await prisma.employee.create(createArgs);
  }

  async update(updateArgs) {
    return await prisma.employee.update({
      where: {
        id: this.self.id,
      },
      ...updateArgs,
    });
  }

  async remove() {
    return await prisma.employee.delete({
      where: {
        id: this.self.id,
      },
    });
  }
}

module.exports = Employee;
