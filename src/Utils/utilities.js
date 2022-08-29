export const renderPreferedPriceCurrency = (product, selectedCurrency) => {
  const priceObject = product?.prices.find(
    (price) => price.currency.label === selectedCurrency?.label
  );
  return priceObject;
};

export const showSize = (value, displayValue) => {
  switch (value) {
    case "40":
      return "XS";
    case "41":
      return "S";
    case "42":
      return "M";
    case "43":
      return "L";
    case "512G":
      return displayValue;
    case "1T":
      return displayValue;
    case "Yes":
      return displayValue;
    case "No":
      return displayValue;
    default:
      return;
  }
};

export const incrementQuantity = (prodObj, dispatch, func) => {
  dispatch(func(prodObj));
};

export const decrementQuantity = (prodObj, dispatch, func) => {
  dispatch(func(prodObj));
};
