import React, { Component } from 'react';
import { connect } from "react-redux";
import { pageChange, getUserThunk, unfollowThunk, followThunk } from "../../redux/users-reducer";
import Users from './Users';



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
        users: state.usersPage.users, 
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        btnDisabled: state.usersPage.btnDisabled,
    }
}


export default connect(mapStateToProps, 
    { pageChange, getUserThunk, unfollowThunk, followThunk })
    (UsersContainer);



