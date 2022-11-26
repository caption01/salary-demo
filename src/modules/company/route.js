const express = require('express');
const { body } = require('express-validator');

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

const router = express.Router();

const validate = {
  create: [body('name').isString()],
  update: [body('name').isString()],
};

router.use(roleGuard(ROLE.SUPER_ADMIN));

router.get('/', getAllCompany);
router.get('/:id', getCompany);
router.post('/', ...validate.create, validators, createCompany);
router.put('/:id', ...validate.update, validators, updateCompany);
router.delete('/:id', deleteCompany);
router.post('/:id/admin', addClientAdminCompany);

module.exports = router;
