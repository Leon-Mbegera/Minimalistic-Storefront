const initialState = {
  symbol: "$",
  label: "USD",
};

const extract = localStorage.getItem("savedCurrency");
const storage = JSON.parse(extract);

const currencyReducer = (state = storage ? storage : initialState, action) => {
  switch (action.type) {
    case "CURRENCY_CHANGE":
      localStorage.setItem("savedCurrency", JSON.stringify({
        ...state,
        symbol: action.payload.symbol,
        label: action.payload.label,
      }))
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
