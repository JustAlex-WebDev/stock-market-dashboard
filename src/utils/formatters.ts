export const formatPrice = (price: number): string => `$${price.toFixed(2)}`;
export const formatPercentage = (change: number): string =>
  `${change.toFixed(2)}%`;
