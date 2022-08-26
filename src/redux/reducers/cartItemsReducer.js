import { REMOVE_FROM_CART } from "../index";

const initialCartItems = {
  cart: [],
};

const cartReducer = (state = initialCartItems, action) => {
  console.log("did you get here?", state);
  switch (action.type) {
    case "ADD_TO_CART":
      const check_prod = action.payload.product;
      const check_idx = state.cart.findIndex(
        ({ product }) => product.id === check_prod.id
      );
      if (check_idx === -1) {
        return { cart: [...state.cart, action.payload] };
      } else {
        const newObj = {
          ...state.cart[check_idx],
          quantity: (state.cart[check_idx].quantity += 1),
        };
        const newState = state.cart.filter((theone, index) => {
          if (index !== check_idx) return theone;
        });
        console.log("huuh", newObj, "and this", newState);
        return {
          cart: [...newState, newObj],
        };
      }
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
