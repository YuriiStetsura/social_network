import React, { Component } from 'react';
import { connect } from "react-redux";
import { follow, unfollow, setUser, setUsersTotalCount, pageChange, toggleLoader } from "../../redux/users-reducer";
import Users from './Users';
import * as axios from 'axios';


class UsersContainer extends Component {
    
    componentDidMount() {
        this.props.toggleLoader(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUser(response.data.items);
                    this.props.setUsersTotalCount(response.data.totalCount);
                    this.props.toggleLoader(false);
                });
    }

    onPageChange = (p) => {
        this.props.toggleLoader(true);
        this.props.pageChange(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUser(response.data.items);
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



