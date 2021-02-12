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



class ProfileContainer extends Component {

    refreshProfile() {
        // this.props.history.push("/dialogs");
        let userId = this.props.match.params.userId; // save id user
        // console.log(userId);
        if(!userId) {
            userId = this.props.initializedUserId;
            // console.log(userId);
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        
        this.props.getProfileUserThunk(userId); //thunk
        this.props.setStatusUserThunk(userId);
    }
    
    componentDidMount() {
        this.refreshProfile(); 
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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

let mapStateToProps = (state) => {
    return {
        profileUser: state.profilePage.profileUser,
        status: state.profilePage.status,
        initializedUserId : state.auth.id,
    }
}

export default compose(connect(mapStateToProps, 
    { getProfileUserThunk, setStatusUserThunk, updateStatusUserThunk, setProfileAvatarThunk, updateProfileInfoThunk }),
                               withRouter,withAuthRedirect)(ProfileContainer)

