import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { getProfileUserThunk, setStatusUserThunk, updateStatusUserThunk } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends Component {
    
    componentDidMount() {
        
        let userId = this.props.match.params.userId; // save id user
        //14418
        if(!userId) {
            userId = 14418;
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
    }
}

export default compose(connect(mapStateToProps, { getProfileUserThunk, setStatusUserThunk, updateStatusUserThunk }),
                               withRouter,withAuthRedirect)(ProfileContainer)

