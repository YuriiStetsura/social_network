import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { getProfileUserThunk, setStatusUserThunk, updateStatusUserThunk } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends Component {
    
    componentDidMount() {
        // console.log(this.props.initializedUserId);
        let userId = this.props.match.params.userId; // save id user
        
        if(!userId) {
            userId = this.props.initializedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        
        this.props.getProfileUserThunk(userId); //thunk
        this.props.setStatusUserThunk(userId);
    }

    render() {
        return <Profile profileUser={this.props.profileUser}
                        status={this.props.status}
                        updateStatusUserThunk={this.props.updateStatusUserThunk}
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

export default compose(connect(mapStateToProps, { getProfileUserThunk, setStatusUserThunk, updateStatusUserThunk }),
                               withRouter,withAuthRedirect)(ProfileContainer)

