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
