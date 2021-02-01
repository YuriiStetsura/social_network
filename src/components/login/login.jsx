import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SelectField } from '../common/FormsControls/FormsControls';
import { required, maxLength } from '../common/utils/validation';

const maxLengthValue = maxLength(10);
const Input = SelectField("input");

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  name="login" 
                        placeholder="login" 
                        validate={[required, maxLengthValue]}
                        component={Input}
                />
            </div>
            <div>
                <Field  name="password" 
                        placeholder="password" 
                        validate={[required, maxLengthValue]}
                        component={Input}
                />
            </div>
            <div>
                <Field  name="chekbox" type="checkbox" component={Input} /> Remember me
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