export const SET_CATEGORY = "SET_CATEGORY";
export const setCategory = (data) => ({
  type: SET_CATEGORY,
  payload: data,
});

export const GET_HELPER_DATA = "GET_HELPER_DATA";
export const setHelperData = (data) => ({
  type: GET_HELPER_DATA,
  payload: data,
});

// upload declaration...
export const SET_FILE_PROGRESS = "SET_FILE_PROGRESS";
export const setFileProgress = (data) => ({
  type: SET_FILE_PROGRESS,
  payload: data,
});
export const SET_UPLOAD_FILE = "SET_UPLOAD_FILE";
export const setUploadFile = (data) => ({
  type: SET_UPLOAD_FILE,
  payload: data,
});

export const SET_UPLOAD_PROGRESS = "SET_UPLOAD_PROGRESS";
export const setUploadProgress = (id, progress) => ({
  type: SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress,
  },
});

export const SUCCESS_UPLOAD_FILE = "SUCCESS_UPLOAD_FILE";
export const successUploadFile = (id) => ({
  type: SUCCESS_UPLOAD_FILE,
  payload: id,
});

export const FAILURE_UPLOAD_FILE = "FAILURE_UPLOAD_FILE";
export const failureUploadFile = (id) => ({
  type: FAILURE_UPLOAD_FILE,
  payload: id,
});

export const SET_IMAGE_IDS = "SET_IMAGE_IDS";
export const imageIds = (data) => ({
  type: SET_IMAGE_IDS,
  payload: data,
});
export const SET_DECLARATON_ID = "SET_DECLARATON_ID";
export const setDeclarationId = (id) => ({
  type: SET_DECLARATON_ID,
  payload: id,
});

// upload announcement image...
export const SET_IMAGE_PROGRESS = "SET_IMAGE_PROGRESS";
export const setImageProgress = (data) => ({
  type: SET_IMAGE_PROGRESS,
  payload: data,
});
export const SET_UPLOAD_IMAGE = "SET_UPLOAD_IMAGE";
export const setUploadImage = (data) => ({
  type: SET_UPLOAD_IMAGE,
  payload: data,
});

export const SET_UPLOAD_IMAGE_PROGRESS = "SET_UPLOAD_IMAGE_PROGRESS";
export const setUploadImageProgress = (id, progress) => ({
  type: SET_UPLOAD_IMAGE_PROGRESS,
  payload: {
    id,
    progress,
  },
});

export const SUCCESS_UPLOAD_IMAGE = "SUCCESS_UPLOAD_IMAGE";
export const successUploadImage = (id) => ({
  type: SUCCESS_UPLOAD_IMAGE,
  payload: id,
});

export const FAILURE_UPLOAD_IMAGE = "FAILURE_UPLOAD_IMAGE";
export const failureUploadImage = (id) => ({
  type: FAILURE_UPLOAD_IMAGE,
  payload: id,
});

export const SET_ANNOUNCEMENT_IMAGE_IDS = "SET_ANNOUNCEMENT_IMAGE_IDS";
export const announcementImageIds = (data) => ({
  type: SET_ANNOUNCEMENT_IMAGE_IDS,
  payload: data,
});
