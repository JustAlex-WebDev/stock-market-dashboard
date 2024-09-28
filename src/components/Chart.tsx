import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { convertUnixTimestampToDate } from "../helpers/date-helper";
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

/**
 * Chart component to display historical stock data
 * Utilizes Recharts library to render an AreaChart within a responsive container
 * @returns {JSX.Element} The chart displaying stock prices over time
 */
const Chart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Get historical data and selected coin from Redux store
  const { selectedCoin, historicalData, historicalDataStatus } = useSelector(
    (state: RootState) => state.stocks,
  );

  // Define time range
  const from = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 7;
  const to = Math.floor(Date.now() / 1000);

  // Fetch historical data when the selected coin changes
  useEffect(() => {
    const fetchData = async () => {
      if (selectedCoin) {
        try {
          await dispatch(
            fetchHistoricalData({
              id: selectedCoin.id,
              vsCurrency: "usd",
              from,
              to,
            }),
          ).unwrap(); // Unwrap to handle possible errors
        } catch (error) {
          console.error("Failed to fetch historical data", error);
        }
      }
    };

    fetchData();
  }, [selectedCoin, dispatch]);

  // Format data for Recharts
  const formatData = useMemo((): Array<{ value: string; date: string }> => {
    if (!historicalData || !historicalData.prices) return [];
    return historicalData.prices.map(([timestamp, price]) => ({
      value: price.toFixed(2), // Ensure price exists before calling toFixed
      date: convertUnixTimestampToDate(timestamp),
    }));
  }, [historicalData]);

  // Loading state
  if (historicalDataStatus === "loading") {
    return <span>Loading...</span>; // Show spinner instead of text
  }

  // Error handling
  if (!historicalData || historicalDataStatus === "failed") {
    return <span>Error loading historical data</span>;
  }

  return (
    <Card>
      <ResponsiveContainer>
        <AreaChart data={formatData}>
          {" "}
          {/* Use formatData directly */}
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgb(199 210 254)"
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor="rgb(199 210 254)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
