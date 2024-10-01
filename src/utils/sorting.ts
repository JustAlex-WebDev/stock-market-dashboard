import { Coin } from "../types";

/**
 * Sorts an array of coins by their current price in descending order.
 * @param coins - An array of Coin objects to sort.
 * @returns {Coin[]} - A new array of coins sorted by current price.
 */
export const sortByPriceDescending = (coins: Coin[]): Coin[] => {
  return [...coins].sort((a, b) => {
    const priceA = parseFloat(a.current_price as any); // Ensure it's a number
    const priceB = parseFloat(b.current_price as any);
    return priceB - priceA;
  });
};

/**
 * Sorts an array of coins by their 24-hour price change percentage in descending order.
 * @param coins - An array of Coin objects to sort.
 * @returns {Coin[]} - A new array of coins sorted by price change percentage.
 */
export const sortByPercentageChangeDescending = (coins: Coin[]): Coin[] => {
  return [...coins].sort((a, b) => {
    const changeA = parseFloat(a.price_change_percentage_24h as any);
    const changeB = parseFloat(b.price_change_percentage_24h as any);
    return changeB - changeA;
  });
};
