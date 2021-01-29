import React from 'react';
import { Redirect } from 'react-router-dom';

export const withAuthRedirect = (Component) => {
    class ComponentRedirect extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to="/login" />

            return <Component {...this.props} />
        }
        
    }

    return ComponentRedirect;
}

