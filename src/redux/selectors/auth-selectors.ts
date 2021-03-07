import { createSelector } from 'reselect';
import { appStateType } from '../redux-store';

export const getAuth = (state: appStateType) => {
    return state.auth.isAuth
}
export const getCaptchaUrl = (state: appStateType) => {
    return state.auth.captchaUrl
}
export const getLogin = (state: appStateType) => {
    return state.auth.login
}
export const getErrorAuth = (state: appStateType) => {
    return state.auth.errorAuth
}
