const express = require('express');
const { body } = require('express-validator');

const { ROLE } = require('../../services/prisma');
const roleGuard = require('../../middlewares/roleGuard/roleGuard');

const { createTransfer } = require('./controller/transfer');

const router = express.Router({ mergeParams: true });

router.use(roleGuard([ROLE.EMPLOYEE, ROLE.SUPER_ADMIN]));

router.post('/', createTransfer);

module.exports = router;
