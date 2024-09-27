import React from "react";

// Create a context with a default value of undefined
// This context will be used to pass stock-related data through the component tree
const StockContext = React.createContext<
  | {
      stockSymbol: string;
      setStockSymbol: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

export default StockContext;
