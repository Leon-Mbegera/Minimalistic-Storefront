import { configureStore } from "@reduxjs/toolkit";

import allDataReducer from "./reducers/allDataReducer";
import cartReducer from "./reducers/cartItemsReducer";
import currencyReducer from "./reducers/currecyReducer";

const store = configureStore({
  reducer: {
    allData: allDataReducer,
    cartData: cartReducer,
    selectedCurrency: currencyReducer,
  },
});

export default store;
