import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import * as axios from 'axios';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends Component {
    
    componentDidMount() {
        
        let userId = this.props.match.params.userId;

        if(!userId) {
            userId = 14418;
        }
        
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
                .then(response => {
                    this.props.setUserProfile(response.data);
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