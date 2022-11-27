const { Transfer } = require('../../../models');
const { groupTransfer } = require('../utils/transfer');

class TransferService {
  async groupTransfersInMonthOf(employeeId) {
    const findAllArgs = {
      where: {
        employeeId: employeeId,
        approved: false,
      },
    };

    const transfers = await new Transfer().findAll(findAllArgs);

    if (!transfers) {
      return {};
    }

    return groupTransfer(transfers);
  }

  async canRequest(employee, { requestAmount, requestDate }) {
    const employeeId = employee.id;
    const employeeBaseSalary = employee.baseSalary;

    const transfers = await this.groupTransfersInMonthOf(employeeId);

    const usageTransferInMonth = transfers[requestDate];

    if (!usageTransferInMonth) {
      return true;
    }

    const totalRequestedInMonth = usageTransferInMonth + requestAmount;

    return totalRequestedInMonth < employeeBaseSalary * 0.5;
  }

  async createTransaction(transfer) {
    const createArgs = {
      data: {
        amount: transfer.amount,
        date: transfer.date,
        companyId: transfer.companyId,
        employeeId: transfer.employeeId,
      },
    };
    return new Transfer().create(createArgs);
  }
}

module.exports = TransferService;
