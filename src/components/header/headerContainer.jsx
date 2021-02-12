import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';


class HeaderContainer extends Component {
    
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, { logout })(HeaderContainer);