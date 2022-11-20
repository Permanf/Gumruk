// auth
export const getIsLogged = (state) => state.auth.isLogged;
export const getToken = (state) => state.auth.token;
export const getIsLoading = (state) => state.auth.isLoading;
export const getUser = (state) => state.auth.user;
export const getAuth = (state) => state.auth;
export const getStaffList = (state) => state.auth.staff_list;
// data
export const getCategory = (state) => state.data.categories;
export const getFilters = (state) => state.data.filters;
export const getlang = (state) => state.data.lang;
export const getUpload = (state) => state.data.fileProgress;
export const getImageIds = (state) => state.data.imageIds;
export const getDeclarationId = (state) => state.data.declarationId;
