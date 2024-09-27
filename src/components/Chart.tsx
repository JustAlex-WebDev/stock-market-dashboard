import React, { useState } from "react";
import { mockHistoricalData } from "../constants/mock";
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

/**
 * Chart component to display historical stock data
 * Utilizes Recharts library to render an AreaChart within a responsive container
 * @returns {JSX.Element} The chart displaying stock prices over time
 */
const Chart: React.FC = () => {
  // State to hold historical stock data
  const [data, setData] = useState(mockHistoricalData);

  // State to hold filter options (e.g., "1W", "1M", etc.)
  const [filter, setFilter] = useState("1W");

  /**
   * Formats historical data for chart rendering
   * Converts the close price (c) and timestamp (t) to the required chart format
   * @returns {Array<{value: string, date: string}>} An array of objects containing value and formatted date
   */
  const formatData = (): Array<{ value: string; date: string }> => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2), // Close price as a string with 2 decimal points
        date: convertUnixTimestampToDate(data.t[index]), // Convert UNIX timestamp to date string
      };
    });
  };

  return (
    <Card>
      <ResponsiveContainer>
        <AreaChart data={formatData()}>
          {/* Linear gradient definition for area chart fill */}
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

          {/* Area chart element */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)" // Reference to the gradient defined above
          />

          {/* Tooltip for displaying data on hover */}
          <Tooltip />

          {/* X-axis with date as the key */}
          <XAxis dataKey="date" />

          {/* Y-axis with dynamic domain based on data */}
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
