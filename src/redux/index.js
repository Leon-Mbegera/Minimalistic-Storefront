import { Query } from "react-apollo";
import { allData } from "../gql/Query";

const ALL_DATA_REQUEST = "ALL_DATA_REQUEST";
const ALL_DATA_SUCCESS = "ALL_DATA_SUCCESS";
const ALL_DATA_ERROR = "ALL_DATA_ERROR";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CURRENCY_CHANGE = "CURRENCY_CHANGE";

// action creators

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

const queryAllData = () => (dispatch) => {
  return (
    <Query query={allData} pollInterval={500}>
      {({ loading, error, data }) => {
        console.log("loading", loading);
        console.log("error", error);
        console.log("fetched data", data);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :( </p>;

        dispatch(allDataSuccess(data.categories));
      }}
    </Query>
  );
};

export {
  ALL_DATA_REQUEST,
  ALL_DATA_SUCCESS,
  ALL_DATA_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  allDataRequest,
  allDataSuccess,
  allDataError,
  addToCart,
  removeFromCart,
  queryAllData,
};
