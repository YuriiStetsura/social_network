import React, { Component } from 'react';
import * as axios from 'axios';
import Users from './Users';

class UsersApiContainer extends Component {
    

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUser(response.data.items);
                    this.props.setUsersTotalCount(response.data.totalCount);
                });
    }

    onPageChange = (p) => {
        this.props.pageChange(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUser(response.data.items);
                });
    }

    render() {
        return <Users onPageChange={this.onPageChange}
                      totalCount={this.props.totalCount}
                      users={this.props.users}
                      unfollow={this.props.unfollow} 
                      follow={this.props.follow}
        />
        
    }
}

export default UsersApiContainer;

