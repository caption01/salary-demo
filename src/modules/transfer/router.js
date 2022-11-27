const express = require('express');
const { body } = require('express-validator');

const { ROLE } = require('../../services/prisma');
const roleGuard = require('../../middlewares/roleGuard/roleGuard');
const companyGuard = require('../../middlewares/companyGuard/companyGuard');

const { createTransfer } = require('./controller/transfer');

const router = express.Router({ mergeParams: true });

router.use(roleGuard([ROLE.EMPLOYEE, ROLE.SUPER_ADMIN]));
router.use(companyGuard);

router.post('/', createTransfer);

module.exports = router;
