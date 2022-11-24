const run = require('./app');

function start() {
  const port = process.env.PORT || 3000;

  run(port);
}

start();
