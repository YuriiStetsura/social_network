import { ResultCodeEnum, ResultCodeCaptcha } from '../api/api'
import { authAPI } from '../api/auth-api'
import { FormAction, stopSubmit } from 'redux-form'
import { captchaAPI } from '../api/captcha-api'
import { InferActionsType, BaseThunkType } from './redux-store'


export type initialStateType = typeof initialState;

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email:null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action : ActionsType): initialStateType => {
    switch (action.type) {
        case 'AUTH/CAPTCHA_SUCCESS':
        case 'AUTH/SET_AUTH_USER_DATA': {
            return {...state, ...action.data}
        }    
        default:
            return state;
    }
}

//all action type
type ActionsType = ReturnType<InferActionsType<typeof actions>>

//actionCreator

export const actions = {
    setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({ 
        type: 'AUTH/SET_AUTH_USER_DATA', data: {id, login, email, isAuth}
    } as const),
    setCaptcha: (captchaUrl: string | null) => ({
        type: 'AUTH/CAPTCHA_SUCCESS', data: {captchaUrl}
    } as const),
} 

//thunk type
type ThunkType = BaseThunkType<ActionsType | FormAction>

//thunk
export const setAuthMeThunk = (): ThunkType => async(dispatch) => {
    let response = await authAPI.authMe();
    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = response.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
    } 
} 
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async(dispatch) => {
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
                dispatch(actions.setAuthUserData(null, null, null, false));
            } 
} 
export const captchaUrlThunk = (): ThunkType => async(dispatch) => {
    let response = await captchaAPI.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(actions.setCaptcha(captchaUrl));
    
} 

export default authReducer;