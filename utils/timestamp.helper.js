// function getMySQLTimestamp(date = new Date()) {

// if (!(date instanceof Date)) {
//   date = new Date(date);
// }

// if (isNaN(date.getTime())) {
//   throw new Error('Invalid date passed to getMySQLTimestamp');
// }

// const pad = n => (n < 10 ? '0' + n : n);

// return (
//   date.getFullYear() + '-' +
//   pad(date.getMonth() + 1) + '-' +
//   pad(date.getDate()) + ' ' +
//   pad(date.getHours()) + ':' +
//   pad(date.getMinutes()) + ':' +
//   pad(date.getSeconds())
// );}

function getMySQLTimestamp(utcInput) {
  /**
 * Converts UTC ISO timestamp to IST MySQL DATETIME
 * @param {string|Date} utcInput - '2026-01-01T02:30:10.000Z'
 * @returns {string} '2026-01-01 08:00:10'
 */
  const date = utcInput instanceof Date
    ? utcInput
    : new Date(utcInput);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid UTC timestamp');
  }

  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));

  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`
}

module.exports = {
  getMySQLTimestamp
};
