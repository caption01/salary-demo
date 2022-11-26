require('express-async-errors');
require('dotenv').config();

const run = require('./app');

function start() {
  const port = process.env.APP_PORT || 3000;
  run(port);
}

start();
