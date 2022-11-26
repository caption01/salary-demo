const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./middlewares/errors/errorHandler');
const NotFoundError = require('./middlewares/errors/error/notFound');
const authenticate = require('./middlewares/authenticate/authenticate');

const signinRouter = require('./modules/signin/route');
const meRouter = require('./modules/me/route');
const companyRouter = require('./modules/company/route');
const employeeRouter = require('./modules/employee/route');

function run(port) {
  const app = express();

  app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
  });

  // middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // public-routers
  app.use('/signin', signinRouter);

  app.use(authenticate);

  // private-routers
  app.use('/me', meRouter);
  app.use('/company', companyRouter);
  app.use('/employee', employeeRouter);

  app.all('*', (req, res) => {
    throw new NotFoundError();
  });

  app.use(errorHandler);
}

module.exports = run;
