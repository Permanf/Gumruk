// last
export const SET_TOKEN = "SET_TOKEN";
export const setToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

// last end

export const LOGOUT = "LOGOUT";
export const logout = () => ({
  type: LOGOUT,
});

export const USER_LOADING = "USER_LOADING";
export const userLoading = () => ({
  type: USER_LOADING,
});

export const USER_LOAD_FAILED = "USER_LOAD_FAILED";
export const userLoadFailed = () => ({
  type: USER_LOAD_FAILED,
});

export const USER_LOADED = "USER_LOADED";
export const userLoaded = (data) => ({
  type: USER_LOADED,
  payload: data,
});

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const CREATE_STAFF = "CREATE_STAFF";
export const createStaff = (data) => ({
  type: CREATE_STAFF,
  payload: data,
});

export const UPDATE_STAFF = "UPDATE_STAFF";
export const updateStaff = (data) => ({
  type: UPDATE_STAFF,
  payload: data,
});

export const SET_STAFF_LIST = "SET_STAFF_LIST";
export const setStaffList = (data) => ({
  type: SET_STAFF_LIST,
  payload: data,
});

export const UPDATE_STAFF_STATUS = "UPDATE_STAFF_STATUS";
export const updateStaffStatus = (data) => ({
  type: UPDATE_STAFF_STATUS,
  payload: data,
});

export const DELETE_STAFF = "DELETE_STAFF";
export const deleteStaff = (data) => ({
  type: DELETE_STAFF,
  payload: data,
});

export const USER_DATA = "USER_DATA";
export const userData = (data) => ({
  type: USER_DATA,
  payload: data,
});
