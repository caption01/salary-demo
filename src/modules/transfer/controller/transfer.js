const moment = require('moment');

const QueryNotFound = require('../../../middlewares/errors/error/queryNotfound');
const TransferService = require('../service/transfer');
const EmployeeService = require('../../employee/service/employee');

const { convertDateStringToIso } = require('../../../utils/moment');

async function createTransfer(req, res) {
  const transferService = new TransferService();
  const employeeService = new EmployeeService();

  const employeeId = parseInt(req.params.employeeId);
  const companyId = parseInt(req.params.companyId);
  const amount = req.body.amount;
  const date = req.body.date;

  const employee = await employeeService.getOne(employeeId);

  if (!employee) {
    throw new QueryNotFound('Employee not found.', employeeId);
  }

  const canRequest = await transferService.canRequest(employee, {
    requestAmount: amount,
    requestDate: moment(date, 'YYYY-MM-DD').format('YYYY-MM'),
  });

  if (!canRequest) {
    throw new Error(
      'You reach maximum transfer in this month, Please reduce you amount'
    );
  }

  const transfer = {
    amount: amount,
    date: convertDateStringToIso(date),
    companyId: companyId,
    employeeId: employeeId,
  };

  const transaction = await transferService.createTransaction(transfer);

  res.json({
    success: true,
    message: 'you request was submited.',
    data: transaction,
  });
}

module.exports = {
  createTransfer,
};
