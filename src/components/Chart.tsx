import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Card from "./Card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchHistoricalData } from "../redux/stocksSlice";
import {
  formatPrice,
  formatPercentage,
  formatLastUpdated,
} from "../utils/formatters";

/**
 * Chart component displays a historical area chart of the selected cryptocurrency's price.
 * It fetches the historical data from Redux store and renders the chart accordingly.
 * @returns {JSX.Element} The chart of the selected cryptocurrency's historical price data.
 */
const Chart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Redux: Get historical data and selected coin from the store
  const { selectedCoin, historicalData, historicalDataStatus } = useSelector(
    (state: RootState) => state.stocks,
  );

  const [isLoadingHistoricalData, setIsLoadingHistoricalData] = useState(false);

  // Determine if the price change is positive or negative
  const isPositiveChange = selectedCoin
    ? selectedCoin.price_change_24h > 0
    : null;

  // Define time range for historical data (last 24 hours)
  const from = Math.floor(Date.now() / 1000) - 60 * 60 * 24;
  const to = Math.floor(Date.now() / 1000);

  /**
   * useEffect to fetch historical data when the selected coin changes.
   * It dispatches an action to get the historical data from the API.
   */
  useEffect(() => {
    const fetchData = async () => {
      if (selectedCoin) {
        setIsLoadingHistoricalData(true); // Start loading
        try {
          await dispatch(
            fetchHistoricalData({
              id: selectedCoin.id,
              vsCurrency: "usd",
              from,
              to,
            }),
          ).unwrap();
        } catch (error) {
          console.error("Failed to fetch historical data", error);
        } finally {
          setIsLoadingHistoricalData(false); // Stop loading
        }
      }
    };

    fetchData();
  }, [selectedCoin, dispatch]);

  /**
   * useMemo to format the historical data for the chart.
   * Converts the historical data into an array of objects with value and date properties.
   * @returns {Array<{ value: string; date: string }>} Formatted data for the area chart.
   */
  const formatData = useMemo((): Array<{ value: string; date: string }> => {
    if (!historicalData || !historicalData.prices) return [];

    return historicalData.prices.map(([timestamp, price]) => {
      const date = new Date(timestamp).toLocaleString("en-US", {
        hour: "2-digit",
      });

      return {
        value: price.toFixed(2),
        date,
      };
    });
  }, [historicalData]);

  // Loading state
  if (isLoadingHistoricalData || historicalDataStatus === "loading") {
    return <span>Loading...</span>;
  }

  // Error handling
  if (!historicalData || historicalDataStatus === "failed") {
    return <span>Error loading historical data</span>;
  }

  return (
    <Card>
      <div className="flex w-full items-center justify-between border-b-2 border-gray-200 pb-4">
        <div className="flex h-auto items-center gap-4">
          <img
            src={selectedCoin?.image}
            alt={selectedCoin?.name || "Coin Image"}
            className="h-10 w-10"
          />
          <div className="flex h-full flex-col justify-between">
            <span className="text-lg font-bold xl:text-xl">
              {selectedCoin?.name || "Coin Name"}
            </span>
            <span className="text-xs uppercase text-gray-400 xl:text-sm">
              {selectedCoin?.symbol || "SYM"}
            </span>
          </div>
        </div>
        <div className="flex h-full flex-col items-end justify-between">
          <div className="flex items-center justify-center gap-2">
            <span
              className={`rounded-full p-[2px] px-2 text-xs text-white ${
                isPositiveChange ? "bg-lime-500" : "bg-red-500"
              }`}
            >
              {selectedCoin?.price_change_percentage_24h
                ? formatPercentage(selectedCoin.price_change_percentage_24h)
                : "0.00%"}
            </span>
            <span className="text-lg xl:text-xl">
              {selectedCoin ? formatPrice(selectedCoin.current_price) : "0.00"}
            </span>
          </div>
          <div className="text-xs text-gray-400 xl:text-sm">
            Last updated at:{" "}
            {selectedCoin?.last_updated
              ? formatLastUpdated(selectedCoin.last_updated)
              : "00:00 AM"}
          </div>
        </div>
      </div>

      <div className="h-40 transition-all sm:h-52 md:h-64">
        <ResponsiveContainer>
          <AreaChart data={formatData}>
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={
                    isPositiveChange ? "rgb(163,230,53)" : "rgb(239,68,68)"
                  }
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={
                    isPositiveChange ? "rgb(163,230,53)" : "rgb(239,68,68)"
                  }
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositiveChange ? "rgb(137,198,43)" : "rgb(214,58,58)"}
              fillOpacity={1}
              strokeWidth={1}
              fill="url(#chartColor)"
              activeDot={{
                stroke: "white",
                strokeWidth: 2,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: isPositiveChange
                  ? "rgb(163,230,53)"
                  : "rgb(239,68,68)",
                color: "white",
                borderRadius: "0.75rem",
              }}
              itemStyle={{ color: "white" }}
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Price",
              ]}
            />

            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis
              domain={["dataMin", "dataMax"]}
              tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
              tick={{ fontSize: 10 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Chart;
