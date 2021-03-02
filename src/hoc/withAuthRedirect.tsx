import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { appStateType } from '../redux/redux-store';

type MapStatePropsType = {
    isAuth: boolean
};


let mapStateToProps = (state: appStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}


export const withAuthRedirect = <P extends MapStatePropsType>(Component: React.ComponentType<P>) => {
    class ComponentRedirect extends React.Component<MapStatePropsType>{
        render() {
            const {isAuth, ...restProps} = this.props;
            if (!isAuth) return <Redirect to="/login" />
            
            return <Component {...restProps as P} />
        }
        
    }
    let ComponentRedirectWithAuth = connect(mapStateToProps)(ComponentRedirect)
    return ComponentRedirectWithAuth;
}

