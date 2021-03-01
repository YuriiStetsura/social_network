import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

type rootReducerType = typeof rootReducer 
export type appStateType = ReturnType<rootReducerType> // global state type

/////// type action generic ////////
export type InferActionsType<T> = T extends {[key: string]: infer U } ? U : never
// export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any }> = ReturnType<InferActionsType<T>>
// export type ActionTypes = ReturnType<InferActionsType<typeof actions>>
//////////////////////////////

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;