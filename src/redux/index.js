const ALL_DATA_REQUEST = "ALL_DATA_REQUEST";
const ALL_DATA_SUCCESS = "ALL_DATA_SUCCESS";
const ALL_DATA_ERROR = "ALL_DATA_ERROR";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// action creators

const allDataRequest = () => {
  return {
    type: ALL_DATA_REQUEST,
  };
};

const allDataSuccess = (allData) => {
  return {
    type: ALL_DATA_SUCCESS,
    payload: allData,
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
