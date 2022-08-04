import { combineReducers } from "redux";
import allDataReducer from "./allDataReducer";
import cartReducer from "./cartItemsReducer";

const rootReducer = combineReducers({
  allData: allDataReducer,
  cartData: cartReducer,
});

export default rootReducer;
