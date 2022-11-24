const express = require('express');

const { getAllCompany } = require('./controller/company');

const router = express.Router();

router.get('/', getAllCompany);

module.exports = router;
