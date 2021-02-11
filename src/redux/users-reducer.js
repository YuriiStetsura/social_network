import {
    userAPI
} from '../api/api';

const FOLLOW = 'FOLLOWED';
const UNFOLLOW = 'UNFOLLOWED';
const SET_USER = 'SET_USER';
const TOTAL_COUNT = 'TOTAL_COUNT';
const PAGE_CHANGE = 'PAGE_CHANGE';
const IS_FETCHING = 'IS_FETCHING';
const BTN_DISABLED = 'BTN_DISABLED';

let initialState = {
    users: [],
    totalCount: 1,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    btnDisabled: []
}
//reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
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
        case UNFOLLOW:
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
                    return {
                        ...state,
                        users: action.users
                    }
                }
        case TOTAL_COUNT: {
                    return {
                        ...state,
                        totalCount: action.count
                    }
                }
        case PAGE_CHANGE: {
                    return {
                        ...state,
                        currentPage: action.current
                    }
                }
        case IS_FETCHING: {
                    return {
                        ...state,
                        isFetching: action.isFetching
                    }
                }
        case BTN_DISABLED: {
                    return {
                        ...state,
                        btnDisabled: action.btnDisabled ?
                            [...state.btnDisabled, action.userId] :
                            state.btnDisabled.filter(id => id !== action.userId)
                    }
                }
        default:
                    return state;
    }
}

// actionCreator

export const follow = (id) => ({
    type: FOLLOW,
    userId: id
});
export const unfollow = (id) => ({
    type: UNFOLLOW,
    userId: id
});
export const setUser = (users) => ({
    type: SET_USER,
    users: users
});
export const setUsersTotalCount = (count) => ({
    type: TOTAL_COUNT,
    count
});
export const pageChange = (current) => ({
    type: PAGE_CHANGE,
    current
});
export const toggleLoader = (isFetching) => ({
    type: IS_FETCHING,
    isFetching
});
export const toggleBtnDisable = (btnDisabled, userId) => ({
    type: BTN_DISABLED,
    btnDisabled,
    userId
});

//thunk

export const getUserThunk = (currentPage, pageSize) => async(dispatch) => {
    dispatch(toggleLoader(true));

    let data = await userAPI.getUser(currentPage, pageSize);
    dispatch(setUser(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
    dispatch(toggleLoader(false));
};
export const unfollowThunk = (id) => async(dispatch) => {
    dispatch(toggleBtnDisable(true, id));

    let response = await userAPI.unfollowUser(id);
    if (response.data.resultCode === 0) {
        dispatch(unfollow(id));
    }
    dispatch(toggleBtnDisable(false, id));
}
export const followThunk = (id) => async(dispatch) => {
    dispatch(toggleBtnDisable(true, id));
    
    let response = await userAPI.followUser(id);
    if (response.data.resultCode === 0) {
        dispatch(follow(id));
    }
    dispatch(toggleBtnDisable(false, id));
}

export default usersReducer;