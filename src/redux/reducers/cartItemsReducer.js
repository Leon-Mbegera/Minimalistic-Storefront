const initialCartItems = {
  cart: [],
};

const cartReducer = (state = initialCartItems, action) => {
  console.log("did you get here?", state);
  switch (action.type) {
    case "ADD_TO_CART":
      const cart1 = [...state.cart];
      const check_prod = action.payload.product;
      const check_idx = state.cart.findIndex(
        ({ product }) => product.id === check_prod.id
      );
      if (check_idx === -1) {
        return { cart: [...cart1, action.payload] };
      } else {
        const newObj = {
          ...cart1[check_idx],
          quantity: (cart1[check_idx].quantity += 1),
        };
        const newState = cart1.filter((theone, index) => {
          if (index !== check_idx) return theone;
          return null;
        });
        console.log("huuh", newObj, "and this", newState);
        return {
          cart: [...newState, newObj],
        };
      }
    case "REMOVE_FROM_CART":
      const cart = [...state.cart];
      const prodObjIndex = cart.findIndex(
        ({ product }) => product.id === action.payload.product.id
      );
      if (cart[prodObjIndex].quantity > 1) {
        const newprodObj = {
          ...cart[prodObjIndex],
          quantity: (cart[prodObjIndex].quantity -= 1),
        };
        const newState = cart.filter((theone, index) => {
          if (index !== prodObjIndex) return theone;
          return null;
        });
        console.log("huuh", newprodObj, "and this", newState);
        return {
          cart: [...newState, newprodObj],
        };
      } else {
        cart.splice(prodObjIndex, 1);
        console.log("cart here", cart);
        return {
          cart: [...cart],
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
