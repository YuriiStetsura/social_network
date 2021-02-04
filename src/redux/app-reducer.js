import { setAuthMeThunk } from './auth-reducer';


const INITIALISE_SUCCESS = 'INITIALISE_SUCCESS';

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALISE_SUCCESS : {
            return {...state, initialized : true}
        }
        default :
            return state;
    }
}

export const initializeSuccess = () => ({type: INITIALISE_SUCCESS});

export const initialize = () => (dispatch) => {
    let promise = dispatch(setAuthMeThunk())
    Promise.all([promise])
        .then(() => {
            dispatch(initializeSuccess());
        })
}

export default appReducer;