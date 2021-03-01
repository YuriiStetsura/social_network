import { ResultCodeEnum, ResultCodeCaptcha } from '../api/api'
import { authAPI } from '../api/auth-api'
import { stopSubmit } from 'redux-form'
import { captchaAPI } from '../api/captcha-api'
import { ThunkAction } from 'redux-thunk'
import { appStateType } from './redux-store'

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

const authReducer = (state = initialState, action : ActionType): initialStateType => {
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

//data type action
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
    data: {captchaUrl: string | null}
}
//all action type
type ActionType = setAuthUserDataActionType | setCaptchaActionType

//actionCreator

export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataActionType => ({ 
    type: SET_AUTH_USER_DATA, data: {id, login, email, isAuth}
});
export const setCaptcha = (captchaUrl: string | null): setCaptchaActionType => ({
    type: CAPTCHA_SUCCESS, data: {captchaUrl}
});

//thunk type
type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionType>

//thunk
export const setAuthMeThunk = (): ThunkType => async(dispatch) => {
    let response = await authAPI.authMe();
    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, login, email, true));
    } 
} 
//!!!!!!
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async(dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setAuthMeThunk());
            } else {
                if(response.data.resultCode === ResultCodeCaptcha.CaptchaRequired) {
                    dispatch(captchaUrlThunk());
                }
                
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error : message}));
            }
} 
export const logout = (): ThunkType => async(dispatch) => {
    let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            } 
} 
export const captchaUrlThunk = (): ThunkType => async(dispatch) => {
    let response = await captchaAPI.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptcha(captchaUrl));
    
} 

export default authReducer;