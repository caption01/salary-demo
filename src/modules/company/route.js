const express = require('express');
const { body } = require('express-validator');

const employeeRouter = require('../employee/route');

const { ROLE } = require('../../services/prisma');
const roleGuard = require('../../middlewares/roleGuard/roleGuard');
const validators = require('../../middlewares/validators/validators');

const {
  getAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  addClientAdminCompany,
} = require('./controller/company');

const router = express.Router({ mergeParams: true });

const validate = {
  create: [body('name').isString()],
  update: [body('name').isString()],
};

router.use(roleGuard(ROLE.SUPER_ADMIN));

router.get('/', getAllCompany);
router.get('/:companyId', getCompany);
router.post('/', ...validate.create, validators, createCompany);
router.put('/:companyId', ...validate.update, validators, updateCompany);
router.delete('/:companyId', deleteCompany);

router.post('/:companyId/admin', addClientAdminCompany);

module.exports = router;
