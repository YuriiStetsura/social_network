import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { getProfileUserThunk } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends Component {
    
    componentDidMount() {
        
        let userId = this.props.match.params.userId; // save id user

        if(!userId) {
            userId = 14418;
        }
        
        this.props.getProfileUserThunk(userId); //thunk
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

export default compose(connect(mapStateToProps, { getProfileUserThunk }),withRouter,withAuthRedirect)(ProfileContainer)

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) //read url adress (hoc)

// export default connect(mapStateToProps, { getProfileUserThunk })(WithUrlDataContainerComponent); // state, dispatch