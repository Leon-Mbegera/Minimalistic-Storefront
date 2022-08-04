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
      const cart = [...state.cart];
      const targetProduct = action.payload;
      const productIndex = cart.findIndex(
        (prod) => prod.name === targetProduct.name
      );
      if (productIndex < 0) {
        return;
      }
      return {
        cart,
        total: state.total - targetProduct.price,
      };
    default:
      return state;
  }
};

export default cartReducer;
