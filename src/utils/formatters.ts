/**
 * Formats the given price to a US Dollar format with commas.
 * @param {number} price - The price to be formatted.
 * @returns {string} The formatted price string with commas and USD currency symbol.
 */
export const formatPrice = (price: number): string =>
  price.toLocaleString("en-US", { style: "currency", currency: "USD" });

/**
 * Formats the given percentage change to a string representation.
 * @param {number} change - The percentage change to be formatted.
 * @returns {string} The formatted percentage string with two decimal places and a percent sign.
 */
export const formatPercentage = (change: number): string =>
  `${change.toFixed(2)}%`;

/**
 * Converts a timestamp into a human-readable string.
 * Formats the date as 'Month Day, Year, Time AM/PM'.
 * @param {string} timestamp - The timestamp to be formatted.
 * @returns {string} The formatted date string.
 */
export const formatLastUpdated = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
