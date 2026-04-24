/**
 * Date utilities to handle timezone consistency (Central Time).
 */

const getCentralDate = () => {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
};

const getYesterdayCentralDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

module.exports = {
  getCentralDate,
  getYesterdayCentralDate
};
