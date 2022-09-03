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

export const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const getTotal = (cartArr, currency) => {
  let calculatedTotal = 0;
  let quantityCount = 0;
  cartArr.map((prodObj) => {
    quantityCount += prodObj.quantity;
    return (calculatedTotal +=
      renderPreferedPriceCurrency(prodObj.product, currency)?.amount *
      prodObj.quantity);
  });
  return [
    calculatedTotal.toLocaleString(undefined, currencyOptions),
    quantityCount,
  ];
};

export const sneakQuantity = (cartArr) => {
  let sneak = 0;
  cartArr.map((prodObj) => {
    sneak += prodObj.quantity;
  });
  console.log("sneak", sneak);
  return sneak;
};

export const calcTax = (cartArr, currency) => {
  const pc = 21 / 100;
  const total = getTotal(cartArr, currency)[0].replace(",", "");
  return (pc * total).toLocaleString(undefined, currencyOptions);
};
