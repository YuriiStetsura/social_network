import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUserThunk, unfollowThunk, followThunk } from "../../redux/users-reducer";
import Users from './Users';
import {
    getUsers,
    getTotalCount,
    getPageSize,
    getCurrentPage,
    getIsFetching,
    getfollowingUsersId
} from '../../redux/users-selectors';
import { usersType } from '../../type/type';
import { appStateType } from '../../redux/redux-store';

//props Type
type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalCount: number
    isFetching: boolean
    users: Array<usersType>
    followingUsersId: Array<number>
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserThunk: (currentPage: number, pageSize: number) => void
    unfollowThunk: (id: number) => void
    followThunk: (id: number) => void
    
}
type propsType = MapStatePropsType & MapDispatchPropsType
//

class UsersContainer extends Component<propsType> {
    
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUserThunk(currentPage, pageSize);   
    }

    onPageChange = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUserThunk(pageNumber, pageSize);
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
                      followingUsersId={this.props.followingUsersId}
                    //   toggleBtnDisable={this.props.toggleBtnDisable}
        />
        
    }
}

const mapStateToProps = (state: appStateType): MapStatePropsType => {
    return {
        users: getUsers(state), 
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingUsersId: getfollowingUsersId(state),
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>
    (connect(mapStateToProps, { getUserThunk, unfollowThunk, followThunk }),
            withAuthRedirect)(UsersContainer)





