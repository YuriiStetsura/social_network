import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { getProfileUserThunk } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';



class ProfileContainer extends Component {
    
    componentDidMount() {
    
        let userId = this.props.match.params.userId;

        if(!userId) {
            userId = 14418;
        }
        
        this.props.getProfileUserThunk(userId);
    }

    render() {
        
        return <Profile profileUser={this.props.profileUser}
               />
    }    
        
    
}

let mapStateToProps = (state) => {
    return {
        profileUser: state.profilePage.profileUser,
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { getProfileUserThunk })(WithUrlDataContainerComponent);