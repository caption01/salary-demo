const { groupBy, map, mapValues, sumBy } = require('lodash');

const { convertDateIsoToString } = require('../../../utils/moment');

function groupTransfer(transfers = []) {
  let group = transfers.map((t) => ({
    ...t,
    groupKey: convertDateIsoToString(t.date, 'YYYY-MM'),
  }));

  group = groupBy(group, 'groupKey');

  group = mapValues(group, (groupOfMonthTransfer) =>
    sumBy(groupOfMonthTransfer, 'amount')
  );

  return group;
}

module.exports = { groupTransfer };
