import { ADD_TO_CART, REMOVE_FROM_CART } from "../index";

const initialCartItems = {
  cart: [],
  total: 0,
};

const cartReducer = (state = initialCartItems, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.total,
      };
    case REMOVE_FROM_CART:
      cart = [...state.cart];
      cart.splice(cart.indexOf(action.payload));
      return {
        cart,
        total: state.total - action.payload.price,
      };
    default:
      return state;
  }
};
