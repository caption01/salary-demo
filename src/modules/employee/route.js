const express = require('express');
const { body, query } = require('express-validator');

const { ROLE } = require('../../services/prisma');
const roleGuard = require('../../middlewares/roleGuard/roleGuard');
const companyGuard = require('../../middlewares/companyGuard/companyGuard');
const validators = require('../../middlewares/validators/validators');

const {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployees,
} = require('./controller/employee');

const router = express.Router();

const validate = {
  create: [body('name').isString()],
};

router.use(roleGuard(ROLE.CLIENT_ADMIN));
router.use(companyGuard);

router.get('/', getEmployee);
router.post('/', createEmployee);

router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

router.post('/import', importEmployees);

module.exports = router;
