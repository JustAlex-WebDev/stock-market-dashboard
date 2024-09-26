import React from "react";
import StockList from "../components/StockList";

const HomePage: React.FC = () => (
  <div className="p-5">
    <h1 className="mb-4 text-3xl font-bold">Stock Market Dashboard</h1>

    {/* List of stocks */}
    <StockList />
  </div>
);

export default HomePage;
