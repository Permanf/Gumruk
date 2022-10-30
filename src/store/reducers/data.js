import { SET_CATEGORY, SET_FILTER_ID, GET_HELPER_DATA } from "../actions/data";

const initialState = {
  // categories: [],
  filters: {},
  lang: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_CATEGORY:
    //   return {
    //     ...state,
    //     categories: action.payload.categories,
    //   };
    case SET_FILTER_ID:
      return {
        ...state,
        filters: action.payload.filters,
      };
    case GET_HELPER_DATA:
      return {
        ...state,
        lang: action.payload.lang,
      };
    default:
      return state;
  }
};

export default reducer;
