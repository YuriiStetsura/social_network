import { ThunkAction } from 'redux-thunk';
import { setAuthMeThunk } from './auth-reducer';
import { appStateType } from './redux-store';


const INITIALISE_SUCCESS : string = 'APP/INITIALISE_SUCCESS';
//type state
export type initialStateType = {
    initialized: boolean
}
///
let initialState: initialStateType = {
    initialized: false,
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
// action creator type
type initializeSuccessActionType = {
    type: typeof INITIALISE_SUCCESS
}
//all action type
type ActionType = initializeSuccessActionType
//action
export const initializeSuccess = () : initializeSuccessActionType => ({type: INITIALISE_SUCCESS});
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