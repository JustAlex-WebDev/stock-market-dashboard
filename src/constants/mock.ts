// Define TypeScript interfaces for mock data

/**
 * Interface representing a search result item.
 * @property {string} description - The name or description of the item.
 * @property {string} displaySymbol - The display symbol for the item.
 * @property {string} symbol - The actual stock symbol for the item.
 * @property {string} type - The type of stock (e.g., "Common Stock").
 */
interface SearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

/**
 * Interface representing the details of a company.
 * @property {string} country - The country where the company is based.
 * @property {string} currency - The currency used by the company.
 * @property {string} exchange - The stock exchange where the company is listed.
 * @property {string} ipo - The initial public offering date of the company.
 * @property {number} marketCapitalization - The market capitalization of the company.
 * @property {string} name - The name of the company.
 * @property {string} phone - The contact phone number for the company.
 * @property {number} shareOutstanding - The number of shares outstanding.
 * @property {string} ticker - The stock ticker symbol.
 * @property {string} weburl - The URL of the company's website.
 * @property {string} logo - The URL of the company's logo.
 * @property {string} finnhubIndustry - The industry category of the company according to Finnhub.
 */
interface CompanyDetails {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

/**
 * Interface representing a stock quote.
 * @property {number} c - The current price of the stock.
 * @property {number} h - The highest price of the stock for the day.
 * @property {number} l - The lowest price of the stock for the day.
 * @property {number} o - The opening price of the stock for the day.
 * @property {number} pc - The previous close price of the stock.
 * @property {number} t - The timestamp of the quote (in UNIX format).
 */
interface StockQuote {
  c: number; // Current price
  h: number; // Highest price of the day
  l: number; // Lowest price of the day
  o: number; // Opening price
  pc: number; // Previous close price
  t: number; // Timestamp (Unix)
}

/**
 * Interface representing historical stock data.
 * @property {number[]} c - An array of close prices.
 * @property {number[]} h - An array of high prices.
 * @property {number[]} l - An array of low prices.
 * @property {number[]} o - An array of open prices.
 * @property {string} s - Status of the data (e.g., "ok").
 * @property {number[]} t - An array of timestamps (in UNIX format).
 * @property {number[]} v - An array of trading volumes.
 */
interface HistoricalData {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string; // Status (e.g., "ok")
  t: number[]; // Timestamps (Unix)
  v: number[]; // Volume
}

// Mock data with defined types

/**
 * Mock data for search results, used to simulate search functionality.
 * @type {{ count: number; result: SearchResult[] }}
 */
export const mockSearchResults: { count: number; result: SearchResult[] } = {
  count: 4,
  result: [
    {
      description: "APPLE INC",
      displaySymbol: "AAPL",
      symbol: "AAPL",
      type: "Common Stock",
    },
    {
      description: "APPLE INC",
      displaySymbol: "AAPL.SW",
      symbol: "AAPL.SW",
      type: "Common Stock",
    },
    {
      description: "APPLE INC",
      displaySymbol: "APC.BE",
      symbol: "APC.BE",
      type: "Common Stock",
    },
    {
      description: "APPLE INC",
      displaySymbol: "APC.DE",
      symbol: "APC.DE",
      type: "Common Stock",
    },
  ],
};

/**
 * Mock data for company details, providing information about a specific company.
 * @type {CompanyDetails}
 */
export const mockCompanyDetails: CompanyDetails = {
  country: "US",
  currency: "USD",
  exchange: "NASDAQ/NMS (GLOBAL MARKET)",
  ipo: "1980-12-12",
  marketCapitalization: 1415993,
  name: "Apple Inc",
  phone: "14089961010",
  shareOutstanding: 4375.47998046875,
  ticker: "AAPL",
  weburl: "https://www.apple.com/",
  logo: "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
  finnhubIndustry: "Technology",
};

/**
 * Mock data for a stock quote, used to simulate current stock information.
 * @type {StockQuote}
 */
export const mockStockQuote: StockQuote = {
  c: 261.74,
  h: 263.31,
  l: 260.68,
  o: 261.07,
  pc: 259.45,
  t: 1582641000,
};

/**
 * Mock data for historical stock data, used to simulate historical price information.
 * @type {HistoricalData}
 */
export const mockHistoricalData: HistoricalData = {
  c: [217.68, 221.03, 219.89],
  h: [222.49, 221.5, 220.94],
  l: [217.19, 217.1402, 218.83],
  o: [221.03, 218.55, 220],
  s: "ok",
  t: [1569297600, 1569384000, 1569470400],
  v: [33463820, 24018876, 20730608],
};
