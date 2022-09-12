// import { Query } from "react-apollo";
// import { queryCommand } from "../gql/Query";

const ALL_DATA_REQUEST = "ALL_DATA_REQUEST";
const ALL_DATA_SUCCESS = "ALL_DATA_SUCCESS";
const ALL_DATA_ERROR = "ALL_DATA_ERROR";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CURRENCY_CHANGE = "CURRENCY_CHANGE";
const FreezeFalse = "Freeze_False";
const FreezeTrue = "Freeze_True";

// action creators

const freezeContent = () => ({ type: FreezeTrue });
const unfreezeContent = () => ({ type: FreezeFalse });

const allDataRequest = () => {
  return {
    type: ALL_DATA_REQUEST,
  };
};

const allDataSuccess = (allFetchedData) => {
  return {
    type: ALL_DATA_SUCCESS,
    payload: allFetchedData,
  };
};

const allDataError = (error) => {
  return {
    type: ALL_DATA_ERROR,
    payload: error,
  };
};

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
  ALL_DATA_REQUEST,
  ALL_DATA_SUCCESS,
  ALL_DATA_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CURRENCY_CHANGE,
  FreezeFalse,
  FreezeTrue,
  allDataRequest,
  allDataSuccess,
  allDataError,
  addToCart,
  removeFromCart,
  currencyChange,
  freezeContent,
  unfreezeContent,
};
