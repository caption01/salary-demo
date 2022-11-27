const moment = require('moment');

const DEFAULT_FORMAT = 'YYYY-MM-DD';

function getCurrentDate(format = DEFAULT_FORMAT) {
  return moment().format(format);
}

function convertDateStringToIso(dateString, format = DEFAULT_FORMAT) {
  return moment(dateString, format).toISOString();
}

function convertDateIsoToString(dateIso, format = DEFAULT_FORMAT) {
  return moment(dateIso).format(format);
}

module.exports = {
  getCurrentDate,
  convertDateStringToIso,
  convertDateIsoToString,
};
