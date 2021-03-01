import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}


export const withAuthRedirect = (Component) => {
    class ComponentRedirect extends React.Component {
        render() {
            const {isAuth} = this.props;
            if (!isAuth) return <Redirect to="/login" />
            
            return <Component {...this.props} />
        }
        
    }
    let ComponentRedirectWithAuth = connect(mapStateToProps)(ComponentRedirect)
    return ComponentRedirectWithAuth;
}

