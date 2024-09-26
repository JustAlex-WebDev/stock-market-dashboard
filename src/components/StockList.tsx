// components/StockList.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AnimatedStockCard from "./AnimatedStockCard";
import Spinner from "./Spinner";
import { fetchStockData } from "../redux/stocksSlice";

const StockList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    data: stocks,
    loading,
    error,
  } = useAppSelector((state) => state.stocks);

  // Fetch stock data when component mounts
  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  if (loading) return <Spinner />; // Show loading spinner
  if (error) return <p className="text-red-500">Error: {error}</p>; // Show error message

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {stocks.map((stock) => (
        <AnimatedStockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
};

export default StockList;
