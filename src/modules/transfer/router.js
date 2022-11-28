const express = require('express');
const { body } = require('express-validator');

const { ROLE } = require('../../services/prisma');
const roleGuard = require('../../middlewares/roleGuard/roleGuard');
const companyGuard = require('../../middlewares/companyGuard/companyGuard');
const validators = require('../../middlewares/validators/validators');

const { createTransfer } = require('./controller/transfer');

const router = express.Router({ mergeParams: true });

const validate = {
  create: [
    body('amount').custom((value) => {
      return typeof value === 'number' && value > 0;
    }),
    body('date').isString(),
  ],
};

router.use(roleGuard([ROLE.EMPLOYEE, ROLE.SUPER_ADMIN]));
router.use(companyGuard);

router.post('/', ...validate.create, validators, createTransfer);

module.exports = router;
