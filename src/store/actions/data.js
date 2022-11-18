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

// upload
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

// export const uploadFile = (files) => (dispatch) => {
//   if (files.length) {
//     files.forEach(async (file) => {
//       const formPayload = new FormData();
//       formPayload.append("file", file.file);

//       try {
//         await axios({
//           baseURL: "http://95.85.124.76:9000",
//           url: "/api/user/image-store",
//           method: "post",
//           data: formPayload,
//           onUploadProgress: (progress) => {
//             const { loaded, total } = progress;

//             const percentageProgress = Math.floor((loaded / total) * 100);
//             dispatch(setUploadProgress(file.id, percentageProgress));
//           },
//           headers: { "Content-Type": "multipart/form-data" },
//         }).then((res) => {
//           console.log(res);
//           dispatch(successUploadFile(file.id));
//         });
//       } catch (error) {
//         dispatch(failureUploadFile(file.id));
//       }
//     });
//   }
// };
