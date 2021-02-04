import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { pageChange, getUserThunk, unfollowThunk, followThunk } from "../../redux/users-reducer";
import Users from './Users';
import {
    getUsers,
    getTotalCount,
    getPageSize,
    getCurrentPage,
    getIsFetching,
    getBtnDisabled
} from '../../redux/users-selectors';



class UsersContainer extends Component {
    
    componentDidMount() {
        this.props.getUserThunk(this.props.currentPage, this.props.pageSize);   
    }

    onPageChange = (p) => {
        this.props.getUserThunk(p, this.props.pageSize);
    }

    render() {
        return <Users onPageChange={this.onPageChange}
                      currentPage={this.props.currentPage}
                      totalCount={this.props.totalCount}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      followThunk={this.props.followThunk} 
                      unfollowThunk={this.props.unfollowThunk}
                      isFetching={this.props.isFetching}
                      btnDisabled={this.props.btnDisabled}
                      toggleBtnDisable={this.props.toggleBtnDisable}
        />
        
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state), 
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        btnDisabled: getBtnDisabled(state),
    }
}

export default compose(connect(mapStateToProps, { pageChange, getUserThunk, unfollowThunk, followThunk }),
                       withAuthRedirect)(UsersContainer)





