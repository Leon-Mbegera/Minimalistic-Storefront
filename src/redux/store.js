import { configureStore } from "@reduxjs/toolkit";

import allDataReducer from "./reducers/allDataReducer";
import cartReducer from "./reducers/cartItemsReducer";
import clothesReducer from "./reducers/clothesReducer";
import currencyReducer from "./reducers/currecyReducer";
import freezeContent from "./reducers/freezeContentReducer";
import techReducer from "./reducers/techReducer";

const store = configureStore({
  reducer: {
    allData: allDataReducer,
    cartData: cartReducer,
    selectedCurrency: currencyReducer,
    freezeState: freezeContent,
    clothes: clothesReducer,
    tech: techReducer,
  },
});

export default store;
