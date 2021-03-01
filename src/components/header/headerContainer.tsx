import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { appStateType } from '../../redux/redux-store';

//type

type mapStatePropsType = {
    login: string | null
    isAuth: boolean
}
type mapDispatchPropsType = {
    logout: () => void
}
type ownPropsType = {
    // empty
}
type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

class HeaderContainer extends Component<propsType> {
    
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>
                    (mapStateToProps, { logout })(HeaderContainer);