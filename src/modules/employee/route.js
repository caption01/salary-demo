const express = require('express');
const { body } = require('express-validator');

const { ROLE } = require('../../services/prisma');
const roleGuard = require('../../middlewares/roleGuard/roleGuard');
const companyGuard = require('../../middlewares/companyGuard/companyGuard');
const validators = require('../../middlewares/validators/validators');

const {
  getAllEmployee,
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

router.get('/', getAllEmployee);
router.post('/', createEmployee);

router.get('/:id', getEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

router.post('/import', importEmployees);

module.exports = router;
