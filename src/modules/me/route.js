const express = require('express');
const { me } = require('./controller/me');

const router = express.Router();

router.get('/', me);

module.exports = router;
