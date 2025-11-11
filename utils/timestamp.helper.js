function getMySQLTimestamp(date = new Date()) {
  const pad = n => n < 10 ? '0' + n : n;
  return date.getFullYear() + '-' +
    pad(date.getMonth() + 1) + '-' +
    pad(date.getDate()) + ' ' +
    pad(date.getHours()) + ':' +
    pad(date.getMinutes()) + ':' +
    pad(date.getSeconds());
}
module.exports = {
  getMySQLTimestamp
};