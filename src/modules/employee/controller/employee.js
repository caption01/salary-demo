const QueryNotFound = require('../../../middlewares/errors/error/queryNotfound');
const EmployeeService = require('../service/employee');
const UserService = require('../../signin/service/user');

const {
  convertCsvFileToEmployees,
  isEmployeeDataUnique,
  isEmployeeDatabaseUnique,
} = require('../utils/employee');

async function getEmployee(req, res) {
  const employeeService = await new EmployeeService();

  const companyId = parseInt(req.params.companyId);
  const employeeId = parseInt(req.query.employeeId);

  if (!employeeId) {
    const employees = await employeeService.getAll(companyId);
    res.json({ data: employees });
    return;
  }

  const employee = await employeeService.getOneByEmployeeId(
    employeeId,
    companyId
  );

  if (!employee) {
    throw new QueryNotFound('Employee not found in this company', 'employeeId');
  }

  res.json({ data: employee });
}

async function createEmployee(req, res) {
  const employeeService = await new EmployeeService();
  const userService = await new UserService();

  const currentUserId = parseInt(req.user.data.id);
  const companyId = parseInt(req.params.companyId);
  const employeeData = req.body;

  const employeeCreateData = {
    username: employeeData.username,
    password: employeeData.password,
    firstname: employeeData.firstname,
    lastname: employeeData.lastname,
    baseSalary: employeeData.baseSalary,
    companyId: companyId,
    createdById: currentUserId,
  };

  const unique = await userService.isUserUnique(employeeCreateData);

  if (!unique) {
    throw new QueryNotFound('Employee username must be unique');
  }

  const employee = await employeeService.createNewEmployee(employeeCreateData);

  res.json({
    success: true,
    message: 'created new employee',
    data: employee,
  });
}

async function updateEmployee(req, res) {
  const employeeService = await new EmployeeService();

  const companyId = parseInt(req.params.companyId);
  const employeeId = parseInt(req.params.employeeId);
  const employeeData = req.body;

  let employee = await employeeService.getOneByEmployeeId(employeeId);

  if (!employee) {
    throw new QueryNotFound('Employee not found', 'employeeId');
  }

  const employeeUpdateData = {
    username: employeeData.username,
    password: employeeData.password,
    firstname: employeeData.firstname,
    lastname: employeeData.lastname,
    baseSalary: employeeData.baseSalary,
    companyId: companyId,
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

  const employeeId = parseInt(req.params.employeeId);

  let employee = await employeeService.getOneByEmployeeId(employeeId);

  if (!employee) {
    throw new QueryNotFound('Employee not found', 'employeeId');
  }

  employee = await employeeService.removeEmployee(employeeId);

  res.json({
    success: true,
    message: 'deleted employee',
    data: employee,
  });
}

async function importEmployees(req, res) {
  const employeeService = new EmployeeService();

  const currentUserId = parseInt(req.user.data.id);
  const companyId = parseInt(req.params.companyId);

  const csvFile = req.file;
  const employees = await convertCsvFileToEmployees(csvFile);

  if (!(await isEmployeeDataUnique(employees))) {
    throw new Error('employee data "username" must unique, please try agian');
  }

  if (!(await isEmployeeDatabaseUnique(employees, companyId))) {
    throw new Error(
      'employee "username" existing in other company, please try agian'
    );
  }

  await employeeService.importEmployees(employees, companyId, currentUserId);

  res.json({
    success: true,
    message: 'employees are imported ',
  });
}

module.exports = {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployees,
};
