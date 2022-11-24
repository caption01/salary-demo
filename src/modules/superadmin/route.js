const express = require('express');
const { me } = require('./controller/superadmin');

const router = express.Router();

router.get('/', me);

module.exports = router;
