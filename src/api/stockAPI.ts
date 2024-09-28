import axios from "axios";
import { Coin } from "../types";

// Base URL for the CoinGecko API
const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

/**
 * Ensures the API key is available
 * @returns {string} The API key
 * @throws {Error} Throws an error if the API key is missing
 */
const getApiKey = (): string => {
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!apiKey) {
    throw new Error("API key is missing");
  }
  return apiKey;
};

/**
 * Fetches the top 100 coins by market cap from CoinGecko.
 * @returns {Promise<Coin[]>} A promise that resolves to an array of the top 100 coins.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchCoinsList = async (): Promise<Coin[]> => {
  const url = `${COINGECKO_API_BASE}/coins/markets`;
  const params = {
    vs_currency: "usd",
    order: "market_cap_desc", // Sort by market cap
    per_page: 100, // Limit to top 100 coins
    page: 1, // First page
  };

  try {
    const response = await axios.get<Coin[]>(url, {
      headers: { accept: "application/json" },
      params,
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch top coins: ${response.statusText}`);
    }

    return response.data; // Returns an array of top 100 coins
  } catch (error) {
    throw new Error("Error fetching top coins");
  }
};

/**
 * Searches for coins based on a user's query.
 * @param {string} query - The user's search input.
 * @returns {Promise<Coin[]>} A promise that resolves to an array of up to 10 matching coins.
 * @throws {Error} Throws an error if the request fails.
 */
export const searchCoins = async (query: string): Promise<Coin[]> => {
  try {
    const coins = await fetchCoinsList(); // Fetch top 100 coins
    const lowerCaseQuery = query.toLowerCase();

    // Filter coins that match by name, symbol, or id
    const filteredCoins = coins.filter(
      (coin: Coin) =>
        coin.name.toLowerCase().includes(lowerCaseQuery) ||
        coin.symbol.toLowerCase().includes(lowerCaseQuery) ||
        coin.id.toLowerCase().includes(lowerCaseQuery),
    );

    // Sort the filtered results to prioritize exact matches
    const sortedCoins = filteredCoins.sort((a: Coin, b: Coin) => {
      const aExactMatch =
        a.name.toLowerCase() === lowerCaseQuery ||
        a.symbol.toLowerCase() === lowerCaseQuery ||
        a.id.toLowerCase() === lowerCaseQuery;

      const bExactMatch =
        b.name.toLowerCase() === lowerCaseQuery ||
        b.symbol.toLowerCase() === lowerCaseQuery ||
        b.id.toLowerCase() === lowerCaseQuery;

      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      return 0;
    });

    // Limit the results to the top 10 matches
    return sortedCoins.slice(0, 10);
  } catch (error) {
    console.error(`Error searching coins with query "${query}":`, error);
    // Return an empty array instead of throwing an error
    return [];
  }
};

/**
 * Fetch historical coin data within a time range
 * @param {string} coinId - The id of the coin (refer to /coins/list for ids)
 * @param {number} from - UNIX timestamp (start date)
 * @param {number} to - UNIX timestamp (end date)
 * @param {string} vsCurrency - The target currency (e.g., 'usd')
 * @returns {Promise<Object>} - The historical chart data, including prices, market caps, and total volumes
 */
export const fetchCoinHistoricalDataByRange = async (
  coinId: string,
  from: number,
  to: number,
  vsCurrency: string = "usd",
) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API_BASE}/coins/${coinId}//market_chart/range`,
      {
        params: {
          vs_currency: vsCurrency,
          from: from,
          to: to,
        },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": getApiKey(),
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching historical data: ", error);
    throw error;
  }
};
