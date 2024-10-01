import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchStocks } from "../redux/stocksSlice";
import Card from "./Card";
import { Coin } from "../types";
import {
  sortByPriceDescending,
  sortByPercentageChangeDescending,
} from "../utils/sorting";
import { formatPercentage, formatPrice } from "../utils/formatters";
import { fetchTopTenCoins } from "../api/stockAPI";

/**
 * Details component that displays the top 10 coins from the Redux store.
 * @returns {JSX.Element} The details section showing information about the top 10 coins.
 */
const Details: React.FC = () => {
  const dispatch = useAppDispatch(); // Get dispatch function from Redux store
  const { stocks, status, error } = useAppSelector((state) => state.stocks); // Select stocks state from Redux store
  const [sortMethod, setSortMethod] = useState<"price" | "percentage">("price"); // State for sorting method
  const [topCoins, setTopCoins] = useState<Coin[]>([]); // State to store top 10 coins

  useEffect(() => {
    const loadTopCoins = async () => {
      try {
        const coins = await fetchTopTenCoins();
        setTopCoins(coins);
      } catch (err) {
        console.error("Failed to fetch top coins:", err);
      }
    };

    loadTopCoins(); // Initial load of top coins
    const intervalId = setInterval(loadTopCoins, 30000); // Fetch every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Update the top coins when stocks change
    if (stocks.length > 0) {
      setTopCoins(stocks.slice(0, 10)); // Keep only the top 10 coins
    }
  }, [stocks]);

  // Handle loading and error states
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Handle loading and error states
  if (status === "failed") {
    return <div>Error: {error}</div>; // Show error message
  }

  // Sorting function based on the selected sort method
  const sortedCoins =
    sortMethod === "price"
      ? sortByPriceDescending(topCoins)
      : sortByPercentageChangeDescending(topCoins);

  return (
    <Card>
      {/* Sorting Buttons */}
      <div className="mb-2 flex justify-end">
        <button
          className={`p-2 ${sortMethod === "price" ? "font-bold" : ""}`}
          onClick={() => setSortMethod("price")} // Set sorting method to price
        >
          Sort by Price
        </button>
        <button
          className={`p-2 ${sortMethod === "percentage" ? "font-bold" : ""}`}
          onClick={() => setSortMethod("percentage")} // Set sorting method to percentage change
        >
          Sort by Daily % Change
        </button>
      </div>

      {/* Coin List */}
      <ul className="flex h-full w-full flex-col justify-between divide-y-2">
        {sortedCoins.map((coin: Coin) => (
          <li key={coin.id} className="flex flex-col p-2">
            <h2 className="text-lg font-bold">
              {coin.name} ({coin.symbol.toUpperCase()}){" "}
            </h2>
            <div className="flex justify-between">
              <img src={coin.image} alt={coin.name} className="h-10 w-10" />
              <span>
                {coin.current_price !== undefined
                  ? formatPrice(coin.current_price)
                  : "N/A"}{" "}
                {/* Check if current_price is valid */}
              </span>{" "}
              <span>
                {coin.price_change_percentage_24h !== undefined
                  ? formatPercentage(coin.price_change_percentage_24h)
                  : "N/A"}{" "}
                {/* Check if price_change_percentage_24h is valid */}
              </span>{" "}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Details;
