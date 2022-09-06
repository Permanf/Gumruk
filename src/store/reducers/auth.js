import { 
    LOGIN_SUCCESS, LOGOUT, USER_LOADING, USER_LOAD_FAILED, USER_LOADED, SET_TOKEN } from "../actions/auth";

const initialState = {
    token: "",
    isLogged:false,
    isLoading:true,
    categories:{},
    user:{}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // last
        case SET_TOKEN:
            return{
                ...state,
                token: action.payload,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user:action.payload.data,
                isLoading:false,
                isLogged:true,
            };
        case USER_LOADED:
            return {
                ...state,
                ...action.payload,
                isLogged:true,
                isLoading:false
            };
        case LOGOUT:
            return{
                ...state,
                token: "",
                isLogged:false,
                isLoading:true,
                user:{},
                
            }
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOAD_FAILED:
            return{
                ...state,
                token: "",
                isLogged:false,
                isLoading:false,
                user:{},
                
            }
        default:
            return state;
    }
}

export default reducer;