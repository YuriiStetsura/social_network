import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { appStateType } from '../../redux/redux-store';

//type

type MapStatePropsType = {
    login: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    logout: () => void
}
type OwnPropsType = {
    // empty
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class HeaderContainer extends Component<PropsType> {
    
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state: appStateType): MapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, appStateType>
                    (mapStateToProps, { logout })(HeaderContainer);