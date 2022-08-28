const initialCartItems = {
  cart: [],
};

const cartReducer = (state = initialCartItems, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const cart1 = [...state.cart];
      const check_prod = action.payload.product;
      const check_idx = cart1.findIndex(
        ({ product, attrOptions }) =>
          product.id === check_prod.id &&
          JSON.stringify(attrOptions) ===
            JSON.stringify(action.payload.attrOptions)
      );
      if (check_idx === -1) {
        return { cart: [...cart1, action.payload] };
      } else {
        const newstate = Object.assign([...cart1], {
          [check_idx]: {
            ...cart1[check_idx],
            quantity: (cart1[check_idx].quantity += 1),
          },
        });
        console.log("newstate", newstate);
        return {
          cart: [...newstate],
        };
      }
    case "REMOVE_FROM_CART":
      const cart = [...state.cart];
      const prodObjIndex = cart.findIndex(
        ({ product }) => product.id === action.payload.product.id
      );
      if (cart[prodObjIndex].quantity > 1) {
        const newprodObj = cart.splice(prodObjIndex, 1, {
          ...cart[prodObjIndex],
          quantity: (cart[prodObjIndex].quantity -= 1),
        });
        return {
          cart: [...newprodObj],
        };
      } else {
        cart.splice(prodObjIndex, 1);
        return {
          cart: [...cart],
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
