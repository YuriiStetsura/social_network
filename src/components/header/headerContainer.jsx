import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { setAuthMeThunk } from '../../redux/auth-reducer';


class HeaderContainer extends Component {
    
    componentDidMount() {
        this.props.setAuthMeThunk();
    }
    
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

export default connect(mapStateToProps, { setAuthMeThunk })(HeaderContainer);