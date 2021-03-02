import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import {
    getProfileUserThunk,
    setStatusUserThunk,
    updateStatusUserThunk,
    setProfileAvatarThunk,
    updateProfileInfoThunk
} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { profileUserType } from '../../redux/profile-reducer'
import { appStateType } from '../../redux/redux-store';
import {RouteComponentProps} from "react-router";

class ProfileContainer extends Component<PropsType> {

    refreshProfile() {
        
        let userId: number | null = +this.props.match.params.userId; // save id user
       
        if(!userId) {
            userId = this.props.initializedUserId;
            
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        if (!userId) {
            throw new Error('Id should exists in URI params or in state (authorizedUserID)')
        } else {
            this.props.getProfileUserThunk(userId); //thunk
            this.props.setStatusUserThunk(userId);
        }
        
    }
    
    componentDidMount() {
        this.refreshProfile(); 
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <Profile profileUser={this.props.profileUser}
                        status={this.props.status}
                        updateStatusUserThunk={this.props.updateStatusUserThunk}
                        owner={!!this.props.match.params.userId}
                        setProfileAvatarThunk={this.props.setProfileAvatarThunk}
                        updateProfileInfoThunk={this.props.updateProfileInfoThunk}
               />
    }    

}
type PropsType = MapStatePropsType & MapDispatchProps & RouteComponentProps<PathParamsType>
type PathParamsType = {
    userId: string,
}
type MapStatePropsType = {
    profileUser: profileUserType 
    status: string
    initializedUserId: number
}
type MapDispatchProps = {
    getProfileUserThunk: (userId: number) => void
    setStatusUserThunk: (userId: number) => void
    updateStatusUserThunk: (status: string) => void
    setProfileAvatarThunk: (photoFile: File) => void
    updateProfileInfoThunk: (profileData: profileUserType) => Promise<any>
}
let mapStateToProps = (state: appStateType) => {
    return {
        profileUser: state.profilePage.profileUser,
        status: state.profilePage.status,
        initializedUserId : state.auth.id,
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, 
    { getProfileUserThunk, setStatusUserThunk, updateStatusUserThunk, setProfileAvatarThunk, updateProfileInfoThunk }),
                               withRouter,withAuthRedirect)(ProfileContainer)

