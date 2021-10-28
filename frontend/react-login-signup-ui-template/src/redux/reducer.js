import { CHANGE_EMAIL, CHANGE_PASSWORD, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILURE, SIGNUP_SUCCESS, USER_FETCH_FAILURE, USER_FETCH_SUCCESS,CHECK_USER } from "./actions";

const userState = {
  isLogin:false,
  userData:{},
  errorMsg:'',
  errorFound:false,
  users:[],
  loading:true

};
const reducer = (state = userState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        isLogin:true,
        errorFound:false,
        errorMsg:''
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        errorFound:true,
        errorMsg:action.payload
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        errorFound:false,
        errorMsg:''
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        errorFound:true,
        errorMsg:action.payload
      };
    }
    case LOGOUT: {
      return {
        ...state,
        userData:{},
        isLogin:false
      };
    }
    case USER_FETCH_SUCCESS : {
      return{
        ...state,
        users:action.payload,
        loading:false
      }
    }
    case USER_FETCH_FAILURE:{
      return{
        ...state,
        users:[],
        errorFound:true,
        errorMsg:action.payload,
        loading:false
      }
    }
    case CHECK_USER:{
      return{
        ...state,
        userData: {},
        isLogin:true,
        errorFound:false,
        errorMsg:'' 
      }
    }
    default: {
      return state;
    }
  }
};
export default reducer;
