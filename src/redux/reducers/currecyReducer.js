import { CURRENCY_CHANGE } from "..";

const initialState = {
  symbol: "$",
  label: "USD",
};

const currencyReducer = (state = initialState, action) => {
  switch (action.payload) {
    case CURRENCY_CHANGE:
      return {
        ...state,
        symbol: action.payload.symbol,
        label: action.payload.label,
      };
    default:
      return state;
  }
};

export default currencyReducer;
