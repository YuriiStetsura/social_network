import { createSelector } from 'reselect';

const getUsersSelector = (state) => {
    return state.usersPage.users;
}
export const getUsers = createSelector( getUsersSelector,
    (users) => {
    return users.filter(u => true);
});

export const getTotalCount = (state) => {
    return state.usersPage.totalCount;
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}
export const getBtnDisabled = (state) => {
    return state.usersPage.btnDisabled;
}