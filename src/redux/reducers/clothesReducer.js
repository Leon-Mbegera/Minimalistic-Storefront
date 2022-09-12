const initialClothesData = {
  name: "",
  products: [],
  error: "",
};

const allDataReducer = (state = initialAllData, action) => {
  switch (action.type) {
    case ALL_DATA_REQUEST:
      return {
        ...state,
        error: "",
      };
    case ALL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case ALL_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default allDataReducer;
