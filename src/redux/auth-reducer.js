import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let initialState = {
    id: null,
    login: null,
    email:null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {...state, ...action.data, isAuth: true}
        }    
        default:
            return state;
    }
}

//actionCreator

export const setAuthUserData = (id, login, email, isAuth) => ({ type: SET_AUTH_USER_DATA, data: {id, login, email, isAuth}});

//thunk

export const setAuthMeThunk = () => async(dispatch) => {
    let response = await authAPI.authMe();
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, login, email, true));
            } 
} 
export const login = (email, password, rememberMe) => async(dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
            if (response.data.resultCode === 0) {
                dispatch(setAuthMeThunk());
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error : message}));
            }
} 
export const logout = () => async(dispatch) => {
    let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthMeThunk(null, null, null, false));
            } 
} 

export default authReducer;