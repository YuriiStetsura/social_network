import { ThunkAction } from 'redux-thunk';
import {
    userAPI
} from '../api/users-api'
import {usersType} from '../type/type';
import { appStateType, InferActionsType } from './redux-store';



export type initialStateType = typeof initialState


let initialState = {
    users: [] as Array<usersType>,
    totalCount: 1, 
    pageSize: 5, 
    currentPage: 1,
    isFetching: false,
    followingUsersId: [] as Array<number>, //array user id
    myFriend: [] as Array<usersType>,
    term: '' as string | null,
    friend: null as boolean | null
}
//reducer
const usersReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'FOLLOW':
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
        case 'UNFOLLOW':
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
        case 'SET_USER': {
                    return {
                        ...state,
                        users: action.users
                    }
                }
        case 'TOTAL_COUNT': {
                    return {
                        ...state,
                        totalCount: action.count
                    }
                }
        case 'PAGE_CHANGE': {
                    return {
                        ...state,
                        currentPage: action.current
                    }
                }
        case 'IS_FETCHING': {
                    return {
                        ...state,
                        isFetching: action.isFetching
                    }
                }
        case 'BTN_DISABLED': {
                    return {
                        ...state,
                        followingUsersId: action.isFetching ?
                            [...state.followingUsersId, action.userId] :
                            state.followingUsersId.filter(id => id !== action.userId)
                    }
                }
        case 'SET_TERM_USERS': {
            return {
                ...state,
                term: action.term
            }
        }
        case 'SET_SELECT_FRIEND': {
            return {
                ...state,
                friend: action.friend
            }
        }
        default:
            return state;
    }
}

// actionCreator
type ActionTypes = ReturnType<InferActionsType<typeof actions>>

export const actions = {
    follow : (id: number) => ({
        type: 'FOLLOW',
        userId: id
    } as const),
    unfollow : (id: number) => ({
        type: 'UNFOLLOW',
        userId: id
    } as const),
    setUser : (users: Array<usersType>) => ({
        type: 'SET_USER',
        users: users
    } as const),
    setUsersTotalCount : (count: number) => ({
        type: 'TOTAL_COUNT',
        count
    } as const),
    pageChange : (current: number) => ({
        type: 'PAGE_CHANGE',
        current
    } as const),
    toggleLoader : (isFetching: boolean) => ({
        type: 'IS_FETCHING',
        isFetching
    } as const),
    toggleBtnDisable : (isFetching: boolean, userId: number) => ({
        type: 'BTN_DISABLED',
        isFetching,
        userId
    } as const),
    setSelectFriend : (friend: boolean | null) => ({
        type: 'SET_SELECT_FRIEND',
        friend
    } as const),
    setTermUsers : (term: string | null) => ({
        type: 'SET_TERM_USERS',
        term
    } as const)
}

//thunk

//type DispatchType = Dispatch<ActionTypes>
// type GetStateType = () => appStateType
type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionTypes>

export const getUserThunk = (currentPage: number, pageSize: number, term: string | null, friend: boolean | null): ThunkType => async(dispatch) => {
    dispatch(actions.toggleLoader(true));

    let data = await userAPI.getUser(currentPage, pageSize, term, friend)
    dispatch(actions.setTermUsers(term))
    dispatch(actions.setSelectFriend(friend))
    dispatch(actions.setUser(data.items))
    dispatch(actions.setUsersTotalCount(data.totalCount))
    dispatch(actions.toggleLoader(false))
};
export const unfollowThunk = (id: number): ThunkType => async(dispatch) => {
    dispatch(actions.toggleBtnDisable(true, id));
    let response = await userAPI.unfollowUser(id);
    if (response.data.resultCode === 0) {
        dispatch(actions.unfollow(id));
    }
    dispatch(actions.toggleBtnDisable(false, id));
}
export const followThunk = (id: number): ThunkType => async(dispatch) => {
    dispatch(actions.toggleBtnDisable(true, id));
    
    let response = await userAPI.followUser(id);
    if (response.data.resultCode === 0) {
        dispatch(actions.follow(id));
    }
    dispatch(actions.toggleBtnDisable(false, id));
}

export default usersReducer;