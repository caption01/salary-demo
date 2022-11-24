const express = require('express');

const { signin } = require('./controller/signin');
const errorAsyncHandler = require('../../utils/errorAsyncHandler');

const router = express.Router();

router.post('/', errorAsyncHandler(signin));

module.exports = router;
