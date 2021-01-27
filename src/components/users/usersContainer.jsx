import React, { Component } from 'react';
import { connect } from "react-redux";
import { follow, unfollow, setUser, setUsersTotalCount, pageChange, toggleLoader } from "../../redux/users-reducer";
import Users from './Users';
import * as axios from 'axios';
import { userAPI } from '../../api/api';


class UsersContainer extends Component {
    
    componentDidMount() {
        this.props.toggleLoader(true);
            userAPI.getUser(this.props.currentPage, this.props.pageSize)
                .then(data => {
                    this.props.setUser(data.items);
                    this.props.setUsersTotalCount(data.totalCount);
                    this.props.toggleLoader(false);
                });
    }

    onPageChange = (p) => {
        this.props.toggleLoader(true);
        this.props.pageChange(p);
            userAPI.getUser(p, this.props.pageSize)
                .then(data => {
                    this.props.setUser(data.items);
                    this.props.toggleLoader(false);
                });
    }

    render() {
        return <Users onPageChange={this.onPageChange}
                      totalCount={this.props.totalCount}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      unfollow={this.props.unfollow} 
                      follow={this.props.follow}
                      isFetching={this.props.isFetching}
        />
        
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users, 
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}


export default connect(mapStateToProps, 
    {follow, unfollow, setUser, setUsersTotalCount, pageChange, toggleLoader})
    (UsersContainer);



