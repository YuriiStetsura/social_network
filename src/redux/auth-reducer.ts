import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
import { captchaAPI } from '../api/api';

const SET_AUTH_USER_DATA: string = 'AUTH/SET_AUTH_USER_DATA';
const CAPTCHA_SUCCESS: string = 'AUTH/CAPTCHA_SUCCESS';


export type initialStateType = typeof initialState;

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email:null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action : any): initialStateType => {
    switch (action.type) {
        case CAPTCHA_SUCCESS:
        case SET_AUTH_USER_DATA: {
            return {...state, ...action.data}
        }    
        default:
            return state;
    }
}

//typeAction

type dataType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA,
    data: dataType

}

type setCaptchaActionType = {
    type: typeof CAPTCHA_SUCCESS,
    data: {captchaUrl: string}
}

//actionCreator

export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataActionType => ({ 
    type: SET_AUTH_USER_DATA, data: {id, login, email, isAuth}
});

export const setCaptcha = (captchaUrl: string): setCaptchaActionType => ({
    type: CAPTCHA_SUCCESS, data: {captchaUrl}
});

//thunk

export const setAuthMeThunk = () => async(dispatch: any) => {
    let response = await authAPI.authMe();
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, login, email, true));
            } 
} 
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async(dispatch: any) => {
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
export const logout = () => async(dispatch: any) => {
    let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            } 
} 
export const captchaUrlThunk = () => async(dispatch: any) => {
    let response = await captchaAPI.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptcha(captchaUrl));
    
} 

export default authReducer;