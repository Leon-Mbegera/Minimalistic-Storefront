import { configureStore } from "@reduxjs/toolkit";

import allDataReducer from "./reducers/allDataReducer";
import cartReducer from "./reducers/cartItemsReducer";
import currencyReducer from "./reducers/currecyReducer";
import freezeContent from "./reducers/freezeContentReducer";

const store = configureStore({
  reducer: {
    allData: allDataReducer,
    cartData: cartReducer,
    selectedCurrency: currencyReducer,
    freezeState: freezeContent,
  },
});

export default store;
