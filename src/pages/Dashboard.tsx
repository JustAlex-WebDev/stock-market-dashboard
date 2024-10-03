import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store"; // Use custom hooks
import { fetchStocks, selectCoin } from "../redux/stocksSlice";
import Header from "../components/Header";
import Details from "../components/TopCoins";
import Chart from "../components/Chart";
import Sidebar from "../components/Sidebar";

/**
 * HomePage component displaying the main dashboard with various sections
 * @returns {JSX.Element} The main dashboard layout with a header, chart and details sections
 */
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCoin = useAppSelector((state) => state.stocks.selectedCoin);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!selectedCoin) {
        const action = await dispatch(fetchStocks("ethereum"));
        if (fetchStocks.fulfilled.match(action)) {
          const bitcoinCoin = action.payload[0];
          if (bitcoinCoin) {
            dispatch(selectCoin(bitcoinCoin));
          }
        }
      }
    };

    fetchInitialData();
  }, [dispatch, selectedCoin]);

  return (
    <div className="m-auto flex h-full w-full">
      {/* Sidebar section with the company name, acc details and navigation links */}
      <Sidebar />

      <div className="flex h-full w-full flex-col items-center justify-center gap-8 md:w-[75%]">
        {/* Header section with the search and sort functionallity */}
        <Header />

        <div className="flex w-full flex-col items-start justify-start gap-6 p-8 pt-0">
          {/* Title */}
          <span className="text-xl font-bold">My Portfolio</span>

          <Details />

          <Chart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
