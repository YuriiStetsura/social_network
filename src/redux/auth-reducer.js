import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
import { captchaAPI } from '../api/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const CAPTCHA_SUCCESS = 'CAPTCHA_SUCCESS';

let initialState = {
    id: null,
    login: null,
    email:null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAPTCHA_SUCCESS:
        case SET_AUTH_USER_DATA: {
            return {...state, ...action.data}
        }    
        default:
            return state;
    }
}

//actionCreator

export const setAuthUserData = (id, login, email, isAuth) => ({ type: SET_AUTH_USER_DATA, data: {id, login, email, isAuth}});
export const setCaptcha = (captchaUrl) => ({ type: CAPTCHA_SUCCESS, data: {captchaUrl}});

//thunk

export const setAuthMeThunk = () => async(dispatch) => {
    let response = await authAPI.authMe();
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, login, email, true));
            } 
} 
export const login = (email, password, rememberMe, captcha) => async(dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
            if (response.data.resultCode === 0) {
                dispatch(setAuthMeThunk());
            } else {
                if(response.data.resultCode ===10) {
                    dispatch(captchaUrlThunk());
                }

                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error : message}));
            }
} 
export const logout = () => async(dispatch) => {
    let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            } 
} 
export const captchaUrlThunk = () => async(dispatch) => {
    let response = await captchaAPI.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptcha(captchaUrl));
    
} 

export default authReducer;