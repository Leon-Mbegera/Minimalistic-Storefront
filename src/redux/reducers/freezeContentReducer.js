import { FreezeTrue, FreezeFalse } from "../index";
const initialState = { freeze: false };

const freezeContent = (state = initialState, action) => {
  switch (action.type) {
    case FreezeTrue:
      return { ...state, freeze: true };
    case FreezeFalse:
      return { ...state, freeze: false };
    default:
      return state;
  }
};

export default freezeContent;
