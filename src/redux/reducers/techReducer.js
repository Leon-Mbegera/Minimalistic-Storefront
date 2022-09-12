import { ALL_DATA_REQUEST, ALL_DATA_SUCCESS, ALL_DATA_ERROR } from "../index";

const initialTechData = {
  name: "",
  products: [],
  error: "",
};

const techReducer = (state = initialTechData, action) => {
  switch (action.type) {
    case ALL_DATA_REQUEST:
      return {
        ...state,
        error: "",
      };
    case ALL_DATA_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        products: action.payload.products,
      };
    case ALL_DATA_ERROR:
      return {
        ...state,
        error: "An error occurred while fetching !",
      };
    default:
      return state;
  }
};

export default techReducer;
