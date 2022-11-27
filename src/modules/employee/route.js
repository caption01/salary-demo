const express = require('express');
const multer = require('multer');
const { body, query } = require('express-validator');

const { ROLE } = require('../../services/prisma');
const roleGuard = require('../../middlewares/roleGuard/roleGuard');
const companyGuard = require('../../middlewares/companyGuard/companyGuard');

const upload = multer({ dest: 'tmp/csv/' });

const {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployees,
} = require('./controller/employee');

const router = express.Router({ mergeParams: true });

const validate = {
  create: [body('name').isString()],
};

router.use(roleGuard([ROLE.CLIENT_ADMIN, ROLE.SUPER_ADMIN]));
router.use(companyGuard);

router.get('/', getEmployee);
router.post('/', createEmployee);

router.put('/:employeeId', updateEmployee);
router.delete('/:employeeId', deleteEmployee);

router.post('/import', upload.single('file'), importEmployees);

module.exports = router;
