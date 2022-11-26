const { Employee } = require('../../../models');

class EmployeeService {
  async getAll(companyId) {
    const findAllArgs = {
      where: {
        company_id: companyId,
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
}

module.exports = EmployeeService;
