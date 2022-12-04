import {
  GET_HELPER_DATA,
  SET_UPLOAD_FILE,
  SET_UPLOAD_PROGRESS,
  SUCCESS_UPLOAD_FILE,
  FAILURE_UPLOAD_FILE,
  SET_IMAGE_IDS,
  SET_FILE_PROGRESS,
  SET_UPLOAD_IMAGE,
  SET_UPLOAD_IMAGE_PROGRESS,
  SUCCESS_UPLOAD_IMAGE,
  FAILURE_UPLOAD_IMAGE,
  SET_ANNOUNCEMENT_IMAGE_IDS,
  SET_IMAGE_PROGRESS,
  SET_DECLARATON_ID,
} from "../actions/data";
import { modifyFiles } from "../../utils/uploadFile";
import { modifyImageIds } from "../../utils/imageIds";

const initialState = {
  lang: "",
  imageProgress: {},
  announcementImageIds: [],
  fileProgress: {},
  imageIds: [],
  declarationId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HELPER_DATA:
      return {
        ...state,
        lang: action.payload.lang,
      };
    // upload declaration
    case SET_FILE_PROGRESS:
      return {
        ...state,
        fileProgress: action.payload,
      };
    case SET_UPLOAD_FILE:
      return {
        ...state,
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
        imageIds: [...modifyImageIds(state.imageIds, action.payload)],
      };
    case SET_DECLARATON_ID:
      return {
        ...state,
        declarationId: action.payload,
      };
    // upload announcement image ...
    case SET_IMAGE_PROGRESS:
      return {
        ...state,
        imageProgress: action.payload,
      };
    case SET_UPLOAD_IMAGE:
      return {
        ...state,
        imageProgress: {
          ...state.imageProgress,
          ...modifyFiles(state.imageProgress, action.payload),
        },
      };
    case SET_UPLOAD_IMAGE_PROGRESS:
      return {
        ...state,
        imageProgress: {
          ...state.imageProgress,
          [action.payload.id]: {
            ...state.imageProgress[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };
    case SUCCESS_UPLOAD_IMAGE:
      return {
        ...state,
        imageProgress: {
          ...state.imageProgress,
          [action.payload]: {
            ...state.imageProgress[action.payload],
            status: 1,
          },
        },
      };

    case FAILURE_UPLOAD_IMAGE:
      return {
        ...state,
        imageProgress: {
          ...state.imageProgress,
          [action.payload]: {
            ...state.imageProgress[action.payload],
            status: 0,
            progress: 0,
          },
        },
      };
    case SET_ANNOUNCEMENT_IMAGE_IDS:
      return {
        ...state,
        announcementImageIds: [
          ...modifyImageIds(state.announcementImageIds, action.payload),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
