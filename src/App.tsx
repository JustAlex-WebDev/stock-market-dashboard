import React, { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import StockContext from "./context/StockContext";

/**
 * Main application component.
 * Responsible for rendering the primary structure of the app.
 * @returns {JSX.Element} The main application structure.
 */
const App: React.FC = () => {
  // State to manage the currently selected stock symbol
  const [stockSymbol, setStockSymbol] = useState<string>("FB");

  return (
    // Provide the stock symbol and its setter function to the context
    <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
      {/* Render the application's routes defined in AppRoutes */}
      {/* This component will handle the navigation between different pages */}
      <AppRoutes />
    </StockContext.Provider>
  );
};

export default App;
