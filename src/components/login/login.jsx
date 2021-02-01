import React from 'react';
import { Field, reduxForm } from 'redux-form';


const LoginForm = (props) => {
    console.log(props);
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="login" placeholder="login" component="input"/>
            </div>
            <div>
                <Field name="password" placeholder="password" component="input"/>
            </div>
            <div>
                <Field name="chekbox" type="checkbox" component="input" /> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
} 


let LoginReduxForm = reduxForm({
    form: 'login'
  })(LoginForm)

const Login = () => {

    let onSubmit = (formData) => {
        console.log(formData)
    }

    return  <>
            <h1>
                Login
            </h1>
            <div>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
            </>
}

export default Login;