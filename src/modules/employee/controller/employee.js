const QueryNotFound = require('../../../middlewares/errors/error/queryNotfound');
const EmployeeService = require('../service/employee');
const CompanyAdminService = require('../../company/service/companyAdmin');

async function getAllEmployee(req, res) {
  const employeeService = await new EmployeeService();

  const companyId = parseInt(req.query.companyId);

  if (!companyId) {
    throw new QueryNotFound('company id not found', 'companyId');
  }

  const employees = await employeeService.getAll(companyId);

  res.json({ data: employees });
}

async function getEmployee(req, res) {
  res.json({});
}

async function createEmployee(req, res) {
  const employeeService = await new EmployeeService();

  const { companyId, ...employee } = req.body;
  const currentUserId = req.user.data.id;

  const employeeData = {
    username: employee.username,
    password: employee.password,
    firstname: employee.firstname,
    lastname: employee.lastname,
    baseSalary: employee.base_salary,
    companyId: companyId,
  };

  const newEmployee = await employeeService.createNewEmployee(
    currentUserId,
    employeeData
  );

  res.json({});
}

async function updateEmployee(req, res) {
  res.json({});
}

async function deleteEmployee(req, res) {
  res.json({});
}

async function importEmployees(req, res) {
  res.json({});
}

module.exports = {
  getAllEmployee,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployees,
};
