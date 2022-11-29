const express = require('express');
const multer = require('multer');
const { checkSchema } = require('express-validator');

const { ROLE } = require('../../services/prisma');
const roleGuard = require('../../middlewares/roleGuard/roleGuard');
const companyGuard = require('../../middlewares/companyGuard/companyGuard');
const validators = require('../../middlewares/validators/validators');

const upload = multer({ dest: 'tmp/csv/' });

const {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployees,
} = require('./controller/employee');

const router = express.Router({ mergeParams: true });

const createSchema = {
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
  baseSalary: {
    custom: {
      options: (value) => {
        return typeof value === 'number' && value > 0;
      },
    },
  },
};

const updateSchema = {
  password: {
    isString: true,
    optional: {
      checkFalsy: true,
    },
  },
  firstname: {
    isString: true,
    optional: {
      checkFalsy: true,
    },
  },
  lastname: {
    isString: true,
    optional: {
      checkFalsy: true,
    },
  },
  baseSalary: {
    custom: {
      options: (value) => {
        return typeof value === 'number' && value > 0;
      },
    },
    optional: {
      checkFalsy: true,
    },
  },
};

const validate = {
  create: checkSchema(createSchema),
  update: checkSchema(updateSchema),
};

router.use(roleGuard([ROLE.CLIENT_ADMIN, ROLE.SUPER_ADMIN]));
router.use(companyGuard);

router.get('/', getEmployee);
router.post('/', validate.create, validators, createEmployee);

router.put('/:employeeId', validate.update, validators, updateEmployee);
router.delete('/:employeeId', deleteEmployee);

router.post('/import', upload.single('file'), importEmployees);

module.exports = router;
