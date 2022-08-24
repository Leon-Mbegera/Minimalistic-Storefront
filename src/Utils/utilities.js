export const renderPreferedPriceCurrency = (product, selectedCurrency) => {
  console.log("reach here", selectedCurrency);
  const priceObject = product?.prices.find(
    (price) => price.currency.label === selectedCurrency?.label
  );
  return priceObject;
};
