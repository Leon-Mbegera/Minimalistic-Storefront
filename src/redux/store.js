import { configureStore } from "@reduxjs/toolkit";

import allDataReducer from "./reducers/allDataReducer";
import cartReducer from "./reducers/cartItemsReducer";

const store = configureStore({
  reducer: {
    allData: allDataReducer,
    cartData: cartReducer,
  }
});

export default store;

