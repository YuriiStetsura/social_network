const FOLLOW = 'FOLLOWED';
const UNFOLLOW = 'UNFOLLOWED';
const SET_USER = 'SET_USER';
const TOTAL_COUNT = 'TOTAL_COUNT';
const PAGE_CHANGE = 'PAGE_CHANGE';
const IS_FETCHING = 'IS_FETCHING';

let initialState = {
    users: [],
    totalCount: 1,
    pageSize: 5,
    currentPage: 1,
    isFetching: false
}

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
            return { ...state, users: action.users}
        }
        case TOTAL_COUNT: {
            return {...state, totalCount : action.count}
        }
        case PAGE_CHANGE: {
            return {...state, currentPage : action.current}
        } 
        case IS_FETCHING: {
            return {...state, isFetching : action.isFetching}
        }    
                default:
                    return state;
    }
}

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

export default usersReducer;