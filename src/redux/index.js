const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CURRENCY_CHANGE = "CURRENCY_CHANGE";
const FreezeFalse = "Freeze_False";
const FreezeTrue = "Freeze_True";

// action creators

const freezeContent = () => ({ type: FreezeTrue });
const unfreezeContent = () => ({ type: FreezeFalse });

const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};

const currencyChange = (currencyOpt) => {
  return {
    type: CURRENCY_CHANGE,
    payload: currencyOpt,
  };
};

export {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CURRENCY_CHANGE,
  FreezeFalse,
  FreezeTrue,
  addToCart,
  removeFromCart,
  currencyChange,
  freezeContent,
  unfreezeContent,
};
