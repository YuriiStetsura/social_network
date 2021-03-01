import { ThunkAction } from 'redux-thunk';
import { setAuthMeThunk } from './auth-reducer';
import { appStateType, InferActionsType } from './redux-store';

const INITIALISE_SUCCESS : string = 'APP/INITIALISE_SUCCESS';
//type state
export type initialStateType = typeof initialState
  
///
let initialState = {
    initialized: false as boolean,
}
//reducer
const appReducer = (state = initialState, action: ActionType) : initialStateType => {
    switch(action.type) {
        case INITIALISE_SUCCESS : {
            return {...state, initialized : true}
        }
        default :
            return state;
    }
}

//all action type
type ActionType = any//ReturnType<InferActionsType<typeof actions>>
//action

export const initializeSuccess = () => ({type: INITIALISE_SUCCESS});
//thunk type
type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionType>
//thunk
export const initialize = (): ThunkType =>  async (dispatch) => {
    await dispatch(setAuthMeThunk());
    dispatch(initializeSuccess());
    // Promise.all([promise])
    //     .then(() => {
    //         dispatch(initializeSuccess());
    //     })
}

export default appReducer;