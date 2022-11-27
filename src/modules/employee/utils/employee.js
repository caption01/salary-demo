const UserService = require('../../signin/service/user');
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

async function isEmployeeDatabaseUnique(employees = []) {
  const userService = new UserService();

  employees.forEach(async (employee) => {
    const can = await userService.isCanUpsert(employee);

    if (!can) {
      return false;
    }
  });

  return true;
}

module.exports = {
  convertCsvFileToEmployees,
  CSV_INDEX,
  isEmployeeDataUnique,
  isEmployeeDatabaseUnique,
};
