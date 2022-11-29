const express = require('express');
const { body, checkSchema } = require('express-validator');

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

const adminSchema = {
  username: {
    isString: true,
  },
  password: {
    isString: true,
  },
  firstname: {
    isString: true,
  },
  lastname: {
    isString: true,
  },
};

const validate = {
  create: [body('name').isString()],
  update: [body('name').isString()],
  addAdmin: checkSchema(adminSchema),
};

router.use(roleGuard(ROLE.SUPER_ADMIN));

router.get('/', getAllCompany);
router.get('/:companyId', getCompany);
router.post('/', ...validate.create, validators, createCompany);
router.put('/:companyId', ...validate.update, validators, updateCompany);
router.delete('/:companyId', deleteCompany);

router.post(
  '/:companyId/admin',
  validate.addAdmin,
  validators,
  addClientAdminCompany
);

module.exports = router;
