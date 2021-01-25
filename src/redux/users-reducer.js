const FOLLOWED = 'FOLLOWED';
const UNFOLLOWED = 'UNFOLLOWED';
const SET_USER = 'SET_USER';

let initialState = {
    users: 
    []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followed: true
                        }
                    }
                    return u;
                })
            }
            case UNFOLLOWED:
                return {
                    ...state,
                    users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {
                                ...u,
                                followed: false
                            }
                        }
                        return u;
                    })
                }
            case SET_USER: {
                return { ...state, users: [...state.users, ...action.users]}
            }    
                default:
                    return state;
    }
}

export const followedAC = (id) => ({
    type: FOLLOWED,
    userId: id
});
export const unfollowedAC = (id) => ({
    type: UNFOLLOWED,
    userId: id
});
export const setUserdAC = (users) => ({
    type: SET_USER,
    users: users
});

export default usersReducer;