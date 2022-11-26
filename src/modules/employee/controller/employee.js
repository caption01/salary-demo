const QueryNotFound = require('../../../middlewares/errors/error/queryNotfound');
const EmployeeService = require('../service/employee');
const CompanyAdminService = require('../../company/service/companyAdmin');

async function getEmployee(req, res) {
  const employeeService = await new EmployeeService();

  const companyId = parseInt(req.query.companyId);
  const employeeId = parseInt(req.query.employeeId);

  if (!employeeId) {
    const employees = await employeeService.getAll(companyId);
    res.json({ data: employees });
    return;
  }

  const employee = await employeeService.getOne(employeeId);
  res.json({ data: employee });
}

async function createEmployee(req, res) {
  const employeeService = await new EmployeeService();

  const currentUserId = req.user.data.id;
  const employeeData = req.body;

  const employeeCreateData = {
    username: employeeData.username,
    password: employeeData.password,
    firstname: employeeData.firstname,
    lastname: employeeData.lastname,
    baseSalary: employeeData.baseSalary,
    companyId: employeeData.companyId,
    createdById: currentUserId,
  };

  const employee = await employeeService.createNewEmployee(employeeCreateData);

  res.json({
    success: true,
    message: 'created new employee',
    data: employee,
  });
}

async function updateEmployee(req, res) {
  const employeeService = await new EmployeeService();

  const employeeId = parseInt(req.params.id);
  const employeeData = req.body;

  let employee = await employeeService.getOne(employeeId);

  if (!employee) {
    throw new QueryNotFound('Employee not found', 'id');
  }

  const employeeUpdateData = {
    username: employeeData.username,
    password: employeeData.password,
    firstname: employeeData.firstname,
    lastname: employeeData.lastname,
    baseSalary: employeeData.baseSalary,
    companyId: employeeData.companyId,
  };

  employee = await employeeService.updateEmployee(
    employeeId,
    employeeUpdateData
  );

  res.json({
    success: true,
    message: 'updated employee',
    data: employee,
  });
}

async function deleteEmployee(req, res) {
  const employeeService = await new EmployeeService();

  const employeeId = parseInt(req.params.id);

  let employee = await employeeService.getOne(employeeId);

  if (!employee) {
    throw new QueryNotFound('Employee not found', 'id');
  }

  employee = await employeeService.removeEmployee(employeeId);

  res.json({
    success: true,
    message: 'deleted employee',
    data: employee,
  });
}

async function importEmployees(req, res) {
  res.json({});
}

module.exports = {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployees,
};
