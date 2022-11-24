const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./middlewares/errors/errorHandler');

const superAdminRouter = require('./superadmin/route');
const signinRouter = require('./signin/route');
const companyRouter = require('./company/route');

const NotFoundError = require('./middlewares/errors/error/notFound');

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

  // private-routers
  app.use('/superadmin', superAdminRouter);
  app.use('/company', companyRouter);

  app.all('*', (req, res) => {
    throw new NotFoundError();
  });

  app.use(errorHandler);
}

module.exports = run;
