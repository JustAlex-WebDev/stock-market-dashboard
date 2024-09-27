/**
 * Converts a Date object to a UNIX timestamp
 * @param {Date} date - The Date object to be converted
 * @returns {number} The corresponding UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC)
 */
export const convertDateToUnixTimestamp = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};

/**
 * Converts a UNIX timestamp to a Date
 * @param {number} unixTimestamp - UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC)
 * @returns {string} The corresponding Date object formatted as a string
 */
export const convertUnixTimestampToDate = (unixTimestamp: number): string => {
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds).toLocaleDateString();
};

/**
 * Creates a new date by adding days/weeks/months/years to a given date. Negative values will also work (for past dates)
 * @param {Date} date - The specified date
 * @param {number} days - The number of days to be added/subtracted (default: 0)
 * @param {number} weeks - The number of weeks to be added/subtracted (default: 0)
 * @param {number} months - The number of months to be added/subtracted (default: 0)
 * @param {number} years - The number of years to be added/subtracted (default: 0)
 * @returns {Date} The new date with the specified additions/subtractions
 */
export const createDate = (
  date: Date,
  days: number = 0,
  weeks: number = 0,
  months: number = 0,
  years: number = 0,
): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};
