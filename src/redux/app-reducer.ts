import { setAuthMeThunk } from './auth-reducer';
import { InferActionsType, BaseThunkType } from './redux-store';


//type state
export type initialStateType = typeof initialState
  
///
let initialState = {
    initialized: false as boolean,
}
//reducer
const appReducer = (state = initialState, action: ActionsType) : initialStateType => {
    switch(action.type) {
        case 'APP/INITIALISE_SUCCESS' : {
            return {...state, initialized : true}
        }
        default :
            return state;
    }
}

//all action type
type ActionsType = ReturnType<InferActionsType<typeof actions>>
//action
export const actions = {
    initializeSuccess : () => ({type: 'APP/INITIALISE_SUCCESS'} as const)
}
//thunk type
type ThunkType = BaseThunkType<ActionsType>
//thunk
export const initialize = (): ThunkType =>  async (dispatch) => {
    await dispatch(setAuthMeThunk());
    dispatch(actions.initializeSuccess());
    // Promise.all([promise])
    //     .then(() => {
    //         dispatch(initializeSuccess());
    //     })
}

export default appReducer;