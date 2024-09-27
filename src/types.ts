export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

// Define the type for search results
export interface SearchResult {
  symbol: string;
  description: string;
}

// Define the type for stock details
export interface StockDetails {
  symbol: string;
  name: string;
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  finnhubIndustry: string;
  // Add more fields if needed based on your API response
}

// Define the type for stock quotes
export interface Quote {
  currentPrice: number;
  high: number;
  low: number;
  previousClose: number;
  // Add more fields if needed based on your API response
}
