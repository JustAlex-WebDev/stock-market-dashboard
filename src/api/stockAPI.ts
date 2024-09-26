export const fetchStockDataFromAPI = async () => {
  const response = await fetch(
    `https://api.example.com/stocks?symbols=AAPL,MSFT,TSLA,GOOGL,AMZN`,
  );

  // Handle fetch failure
  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }

  // Parse and return the JSON data
  return response.json();
};
