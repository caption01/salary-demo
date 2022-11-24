const run = require('./app');

function start() {
  const port = process.env.APP_PORT || 3000;

  run(port);
}

start();
