const UserService = require('../../signin/service/user');
const EmployeeService = require('../../employee/service/employee');
const { read } = require('../../../utils/csv');

const USERNAME = 0;
const PASSWORD = 1;
const FIRSTNAME = 2;
const LASTNAME = 3;
const BASESALARY = 4;

const CSV_INDEX = {
  USERNAME: USERNAME,
  PASSWORD: PASSWORD,
  FIRSTNAME: FIRSTNAME,
  LASTNAME: LASTNAME,
  BASESALARY: BASESALARY,
};

async function convertCsvFileToEmployees(csvFile, { header = true } = {}) {
  let rows = (await read(csvFile)) || [];

  if (header) {
    rows = rows.slice(1, rows.length);
  }

  rows = rows.map((row) => ({
    username: row[CSV_INDEX.USERNAME].trim(),
    password: row[CSV_INDEX.PASSWORD].trim(),
    firstname: row[CSV_INDEX.FIRSTNAME].trim(),
    lastname: row[CSV_INDEX.LASTNAME].trim(),
    baseSalary: parseInt(row[CSV_INDEX.BASESALARY].trim()),
  }));

  return rows;
}

async function isEmployeeDataUnique(employees = []) {
  const uniqueFields = 'username';

  const usernames = employees.map((em) => em[uniqueFields]);
  const usernameUniques = [...new Set(usernames)];

  return usernames.length === usernameUniques.length;
}

async function isEmployeeDatabaseUnique(employees = [], companyId) {
  const userService = new UserService();
  const employeeService = new EmployeeService();

  let pass = true;

  for (let employee of employees) {
    const findArgs = {
      where: {
        username: employee.username,
      },
    };

    const user = await userService.getOne(findArgs);

    if (user) {
      const isEmployeeInCompany = await employeeService.getOneByUserId(
        user.id,
        companyId
      );

      if (!isEmployeeInCompany) {
        pass = false;
      }
    }
  }

  return pass;
}

module.exports = {
  convertCsvFileToEmployees,
  CSV_INDEX,
  isEmployeeDataUnique,
  isEmployeeDatabaseUnique,
};
