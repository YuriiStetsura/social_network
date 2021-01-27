import React, { Component } from 'react';
import Header from './header';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer';


class HeaderContainer extends Component {
    
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{withCredentials: true})
                .then(response => {
                    if (response.data.resultCode === 0) {
                        let {id, login, email} = response.data.data;
                        this.props.setAuthUserData(id, login, email);
                    }
                    
                });
    }
    
    render() {
        // console.log(this.props);
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);