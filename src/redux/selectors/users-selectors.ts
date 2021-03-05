import { createSelector } from 'reselect';
import { appStateType } from '../redux-store';

const getUsersSelector = (state: appStateType) => {
    return state.usersPage.users;
}
export const getUsers = createSelector( getUsersSelector,
    (users) => {
    return users.filter(u => true);
});

export const getTotalCount = (state: appStateType) => {
    return state.usersPage.totalCount;
}
export const getPageSize = (state: appStateType) => {
    return state.usersPage.pageSize;
}
export const getCurrentPage = (state: appStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: appStateType) => {
    return state.usersPage.isFetching;
}
export const getfollowingUsersId = (state: appStateType) => {
    return state.usersPage.followingUsersId;
}
export const getTerm = (state: appStateType) => {
    return state.usersPage.term;
}
export const getFriend = (state: appStateType) => {
    return state.usersPage.friend;
}