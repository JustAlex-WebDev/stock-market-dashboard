import React from "react";
import { motion } from "framer-motion";
import { Stock } from "../types";
import { formatPrice, formatPercentage } from "../utils/formatters";

interface Props {
  stock: Stock;
}

const AnimatedStockCard: React.FC<Props> = ({ stock }) => (
  <motion.div
    className="rounded-md bg-white p-4 shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <h2 className="text-lg font-semibold">
      {stock.name} ({stock.symbol})
    </h2>
    <p>Price: {formatPrice(stock.price)}</p>
    <p className={stock.change > 0 ? "text-green-500" : "text-red-500"}>
      Change: {formatPercentage(stock.change)}
    </p>
  </motion.div>
);

export default AnimatedStockCard;
