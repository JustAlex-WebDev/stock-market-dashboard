import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchStocks, selectCoin } from "../redux/stocksSlice";
import Card from "./Card";
import { Coin } from "../types";
import {
  sortByPriceDescending,
  sortByPercentageChangeDescending,
} from "../utils/sorting";
import { formatPercentage, formatPrice } from "../utils/formatters";
import { fetchTopTenCoins } from "../api/stockAPI";
import { motion } from "framer-motion"; // Import framer motion for animations

const Details: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stocks, status, error } = useAppSelector((state) => state.stocks);
  const [sortMethod, setSortMethod] = useState<"price" | "percentage">("price");
  const [topCoins, setTopCoins] = useState<Coin[]>([]);
  const [timeSinceFetch, setTimeSinceFetch] = useState(0); // Track time since last fetch
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for skeleton animation

  const selectedCoin = useAppSelector((state) => state.stocks.selectedCoin);

  // Handle coin selection
  const handleSelect = useCallback(
    (coin: Coin) => {
      dispatch(selectCoin(coin));
    },
    [dispatch],
  );

  // Load top coins
  useEffect(() => {
    const loadTopCoins = async () => {
      try {
        const coins = await fetchTopTenCoins();
        setTopCoins(coins);
        setTimeSinceFetch(0); // Reset time on new fetch
      } catch (err) {
        console.error("Failed to fetch top coins:", err);
      }
    };

    loadTopCoins(); // Initial load

    const fetchIntervalId = setInterval(loadTopCoins, 30000); // Fetch every 30 seconds
    const timerIntervalId = setInterval(() => {
      setTimeSinceFetch((prev) => prev + 1); // Increment time every second
    }, 1000); // Update every second

    return () => {
      clearInterval(fetchIntervalId);
      clearInterval(timerIntervalId);
    };
  }, []);

  // Update top coins when stocks change
  useEffect(() => {
    if (stocks.length > 0) {
      setTopCoins(stocks.slice(0, 10));
    }
  }, [stocks]);

  // Sort coins based on selected method
  const sortedCoins =
    sortMethod === "price"
      ? sortByPriceDescending(topCoins)
      : sortByPercentageChangeDescending(topCoins);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [topCoins]);

  return (
    <Card>
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        {/* Dynamically updating time */}
        <span className="text-md font-bold">
          Last updated: {timeSinceFetch}s ago
        </span>

        {/* Sort Functionality */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">Sort By:</span>

          <div className="flex items-center gap-2">
            {/* Sort By Price */}
            <button
              type="button"
              aria-label="Sort By Price"
              title="Sort By Price"
              className={`text-sm ${sortMethod === "price" ? "font-bold" : ""} text-gray-400`}
              onClick={() => setSortMethod("price")}
            >
              Price
            </button>
            {/* Sort By Daily % Change */}
            <button
              type="button"
              aria-label="Sort By Daily % Change"
              title="Sort By Daily % Change"
              className={`text-sm ${sortMethod === "percentage" ? "font-bold" : ""} text-gray-400`}
              onClick={() => setSortMethod("percentage")}
            >
              Daily % Change
            </button>
          </div>
        </div>
      </div>

      {error ? (
        // Error message
        <div className="-mt-4 flex h-28 w-full flex-col items-center justify-center gap-2 rounded-xl bg-gray-200">
          <span className="text-xl font-bold">Aw, Snap</span>
          <span className="text-sm">{error?.message}</span>
          <span className="text-xs">Too Many Requests</span>
        </div>
      ) : (
        // Fetched Coins
        <div className="scrollbar-hide -mt-4 w-full overflow-x-auto">
          {isLoading ? (
            // Skeleton Cards
            <div className="flex h-full w-full gap-8 py-4">
              <motion.div
                className="mb-4 h-28 w-40 animate-pulse rounded-xl bg-gray-200 p-4 lg:w-48" // Skeleton card
              />
              <motion.div
                className="mb-4 h-28 w-40 animate-pulse rounded-xl bg-gray-200 p-4 lg:w-48" // Skeleton card
              />
              <motion.div
                className="mb-4 h-28 w-40 animate-pulse rounded-xl bg-gray-200 p-4 lg:w-48" // Skeleton card
              />
              <motion.div
                className="mb-4 h-28 w-40 animate-pulse rounded-xl bg-gray-200 p-4 lg:w-48" // Skeleton card
              />
              <motion.div
                className="mb-4 h-28 w-40 animate-pulse rounded-xl bg-gray-200 p-4 lg:w-48" // Skeleton card
              />
            </div>
          ) : (
            <ul className="flex h-full w-full gap-8 py-4">
              {sortedCoins.map((coin: Coin) => (
                <li
                  key={coin.id}
                  onClick={() => handleSelect(coin)}
                  className={`flex h-28 min-w-40 max-w-40 cursor-pointer flex-col items-start gap-4 rounded-xl p-4 transition-all hover:shadow-md lg:min-w-48 lg:max-w-48 ${
                    coin.name === selectedCoin?.name
                      ? "shadow-md"
                      : "shadow-none"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="h-8 w-8" />
                    <h2 className="text-sm font-semibold">
                      {coin.name.length > 8
                        ? `${coin.name.substring(0, 8)}...`
                        : coin.name}
                    </h2>
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full items-center justify-between gap-2 text-xs">
                      <span className="opacity-50">Price</span>
                      <span className="font-semibold">
                        {coin.current_price !== undefined
                          ? formatPrice(coin.current_price)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between gap-2 text-xs">
                      <span className="opacity-50">Change</span>
                      <span
                        className={`font-semibold ${
                          coin.price_change_percentage_24h !== undefined
                            ? coin.price_change_percentage_24h > 0
                              ? "text-green-500"
                              : "text-red-500"
                            : ""
                        }`}
                      >
                        {coin.price_change_percentage_24h !== undefined
                          ? formatPercentage(coin.price_change_percentage_24h)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
};

export default Details;
