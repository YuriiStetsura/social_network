import {
    userAPI
} from '../api/api';
import {photosType} from "../type/type";

const FOLLOW = 'USERS/FOLLOWED';
const UNFOLLOW = 'USERS/UNFOLLOWED';
const SET_USER = 'USERS/SET_USER';
const TOTAL_COUNT = 'USERS/TOTAL_COUNT';
const PAGE_CHANGE = 'USERS/PAGE_CHANGE';
const IS_FETCHING = 'USERS/IS_FETCHING';
const BTN_DISABLED = 'USERS/BTN_DISABLED';


//initial State Type
type usersType = {
    id: number
    name: string
    status: string | null
    photos: photosType
    follow: boolean
}

export type initialStateType = typeof initialState
///

let initialState = {
    users: [] as Array<usersType>,
    totalCount: 1,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    btnDisabled: [] as Array<number>
}
//reducer
const usersReducer = (state = initialState, action: any): initialStateType => {
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

// action Type

type followType = {
    type: typeof FOLLOW
    userId: number
}
type unfollowType = {
    type: typeof UNFOLLOW
    userId: number
}
type setUserType = {
    type: typeof SET_USER
    users: Array<usersType>
}
type setUsersTotalCountType = {
    type: typeof TOTAL_COUNT
    count: number
}
type pageChangeType = {
    type: typeof PAGE_CHANGE
    current: number
}
type toggleLoaderType = {
    type: typeof IS_FETCHING
    isFetching: boolean
}
type toggleBtnDisableType = {
    type: typeof BTN_DISABLED
    btnDisabled: boolean
    userId: number
}

// actionCreator

export const follow = (id: number): followType => ({
    type: FOLLOW,
    userId: id
});
export const unfollow = (id: number): unfollowType => ({
    type: UNFOLLOW,
    userId: id
});
export const setUser = (users: Array<usersType>): setUserType => ({
    type: SET_USER,
    users: users
});
export const setUsersTotalCount = (count: number): setUsersTotalCountType => ({
    type: TOTAL_COUNT,
    count
});
export const pageChange = (current: number): pageChangeType => ({
    type: PAGE_CHANGE,
    current
});
export const toggleLoader = (isFetching: boolean): toggleLoaderType => ({
    type: IS_FETCHING,
    isFetching
});
export const toggleBtnDisable = (btnDisabled: boolean, userId: number): toggleBtnDisableType => ({
    type: BTN_DISABLED,
    btnDisabled,
    userId
});

//thunk

export const getUserThunk = (currentPage: number, pageSize: number) => async(dispatch: any) => {
    dispatch(toggleLoader(true));

    let data = await userAPI.getUser(currentPage, pageSize);
    dispatch(setUser(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
    dispatch(toggleLoader(false));
};
export const unfollowThunk = (id: number) => async(dispatch: any) => {
    dispatch(toggleBtnDisable(true, id));

    let response = await userAPI.unfollowUser(id);
    if (response.data.resultCode === 0) {
        dispatch(unfollow(id));
    }
    dispatch(toggleBtnDisable(false, id));
}
export const followThunk = (id: number) => async(dispatch: any) => {
    dispatch(toggleBtnDisable(true, id));
    
    let response = await userAPI.followUser(id);
    if (response.data.resultCode === 0) {
        dispatch(follow(id));
    }
    dispatch(toggleBtnDisable(false, id));
}

export default usersReducer;