export const SET_CATEGORY = "SET_CATEGORY";
export const setCategory = (data) => ({
  type: SET_CATEGORY,
  payload: data,
});
export const SET_FILTER_ID = "SET_FILTER_ID";
export const setFilters = (data) => ({
  type: SET_FILTER_ID,
  payload: data,
});

export const GET_HELPER_DATA = "GET_HELPER_DATA";
export const setHelperData = (data) => ({
  type: GET_HELPER_DATA,
  payload: data,
});
