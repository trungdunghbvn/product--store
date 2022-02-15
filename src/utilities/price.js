export const formatPrice = (price) => {
  return price.toLocaleString("it-IT");
};

export const saleOff = (price, originalPrice) => {
  if (originalPrice > price) {
    const sale = originalPrice - price;
    const rate = sale / originalPrice * 100;
    return `-${rate.toFixed(0)}%`;
  }
  return 0;
};
