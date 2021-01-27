import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { profileUserAPI } from '../../api/api';


class ProfileContainer extends Component {
    
    componentDidMount() {
        
        let userId = this.props.match.params.userId;

        if(!userId) {
            userId = 14418;
        }
        
        profileUserAPI.getProfileUser(userId)
                .then(data => {
                    this.props.setUserProfile(data);
                });
    }

    render() {
        return <Profile profileUser={this.props.profileUser}
                        isFetching={this.props.isFetching}/>
    }    
        
    
}

let mapStateToProps = (state) => {
    return {
        profileUser: state.profilePage.profileUser,
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);