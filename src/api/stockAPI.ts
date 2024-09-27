// Import types for better type safety
import { SearchResult, StockDetails, Quote } from "../types"; // Import types from a types file if available

export const fetchStockDataFromAPI = async () => {
  // Ensure the API key is available
  const apiKey = process.env.REACT_APP_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing");
  }

  // Build the API URL with the key as a query parameter or header
  const url = `https://api.example.com/stocks?symbols=AAPL,MSFT,TSLA,GOOGL,AMZN&apikey=${apiKey}`;

  const response = await fetch(url, {
    headers: {
      "X-Finnhub-Token": apiKey,
    },
  });

  // Handle fetch failure
  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }

  // Parse and return the JSON data
  return response.json();
};

// Base URL for the API
const basePath = "https://finnhub.io/api/v1";

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
 * Searches for best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<SearchResult[]>} A promise that resolves to an array of search results
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const searchSymbol = async (query: string): Promise<SearchResult[]> => {
  const apiKey = getApiKey();
  const url = `${basePath}/search?q=${query}&token=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};

/**
 * Fetches the details of a given company
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<StockDetails>} A promise that resolves to the company's details
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchStockDetails = async (
  stockSymbol: string,
): Promise<StockDetails> => {
  const apiKey = getApiKey();
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};

/**
 * Fetches the latest quote of a given stock
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Quote>} A promise that resolves to the latest quote of the stock
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchQuote = async (stockSymbol: string): Promise<Quote> => {
  const apiKey = getApiKey();
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};
