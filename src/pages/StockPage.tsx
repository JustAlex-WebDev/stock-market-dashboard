import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const StockPage: React.FC = () => {
  // Get stock symbol from route params
  const { symbol } = useParams();

  return (
    <motion.div
      className="p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold">Stock Details: {symbol}</h1>

      {/* Add more stock details here */}
    </motion.div>
  );
};

export default StockPage;
