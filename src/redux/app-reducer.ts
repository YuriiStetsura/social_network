import { setAuthMeThunk } from './auth-reducer';


const INITIALISE_SUCCESS : string = 'APP/INITIALISE_SUCCESS';

export type initialStateType = {
    initialized: boolean
}

let initialState: initialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: any) : initialStateType => {
    switch(action.type) {
        case INITIALISE_SUCCESS : {
            return {...state, initialized : true}
        }
        default :
            return state;
    }
}

type initializeSuccessActionType = {
    type: typeof INITIALISE_SUCCESS
}

export const initializeSuccess = () : initializeSuccessActionType => ({type: INITIALISE_SUCCESS});

export const initialize = () =>  async (dispatch: any) => {
    await dispatch(setAuthMeThunk());
    dispatch(initializeSuccess());
    // Promise.all([promise])
    //     .then(() => {
    //         dispatch(initializeSuccess());
    //     })
}

export default appReducer;