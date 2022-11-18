import {
  SET_CATEGORY,
  SET_FILTER_ID,
  GET_HELPER_DATA,
  SET_UPLOAD_FILE,
  SET_UPLOAD_PROGRESS,
  SUCCESS_UPLOAD_FILE,
  FAILURE_UPLOAD_FILE,
  SET_IMAGE_IDS,
} from "../actions/data";
import { modifyFiles } from "../../utils/uploadFile";
import { modifyImageIds } from "../../utils/imageIds";

const initialState = {
  // categories: [],
  filters: {},
  lang: "",
  fileProgress: {
    // format will be like below
    // 1: {
    //   id: 1,
    // file: "",
    //   progress: 0,
    // cancelSource: source,
    //   status: 0,
    // },
  },
  imageIds: [],
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

    case SET_UPLOAD_FILE:
      return {
        ...state,
        // fileProgress: action.payload.file,
        fileProgress: {
          ...state.fileProgress,
          ...modifyFiles(state.fileProgress, action.payload),
        },
      };
    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };
    case SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 1,
          },
        },
      };

    case FAILURE_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 0,
            progress: 0,
          },
        },
      };
    case SET_IMAGE_IDS:
      return {
        ...state,
        imageIds: [
          // ...state.imageIds,
          ...modifyImageIds(state.imageIds, action.payload),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
