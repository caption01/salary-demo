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

  async create(createArgs) {
    return await prisma.employee.create(createArgs);
  }
}

module.exports = Employee;
