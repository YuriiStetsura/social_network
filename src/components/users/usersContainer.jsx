import React, { Component } from 'react';
import { connect } from "react-redux";
import { followedAC, pageChangeAC, setUserdAC, totalUsersCountAC, unfollowedAC } from "../../redux/users-reducer";
import Users from "./usersApiContainer";
import * as axios from 'axios';
import UsersApiContainer from "./usersApiContainer";


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users, 
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (id) => {
            dispatch(followedAC(id));
        },
        unfollow: (id) => {
            dispatch(unfollowedAC(id));
        },
        setUser: (users) => {
            dispatch(setUserdAC(users));
        },
        setUsersTotalCount : (count) => {
            dispatch(totalUsersCountAC(count));
        },
        pageChange : (current) => {
            dispatch(pageChangeAC(current));
        }
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersApiContainer);



export default UsersContainer;