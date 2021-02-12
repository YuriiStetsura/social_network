import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SelectField } from '../common/FormsControls/FormsControls';
import { required, maxLength } from '../common/utils/validation';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { login, captchaUrlThunk } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';

const maxLengthValue = maxLength(30);
const Input = SelectField("input");

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  name="email" 
                        placeholder="login" 
                        validate={[required, maxLengthValue]}
                        component={Input}
                />
            </div>
            <div>
                <Field  name="password" 
                        type="password"
                        placeholder="password" 
                        validate={[required, maxLengthValue]}
                        component={Input}
                />
            </div>
            <div>
                <Field  name="rememberMe" type="checkbox" component={Input} /> Remember me
            </div>
            {props.captchaUrl && <div><img src={props.captchaUrl} alt="captcha"/></div>}
            {props.captchaUrl && <div><Field name="captcha" validate={[required]} component={Input}/></div>} 
            {props.error ? <div className="alert alert-danger" role="alert">{props.error}</div> : undefined}
            <div>
                <Button type="primary" htmlType="submit" ghost >Опублікувати</Button>
            </div>
        </form>
    )
} 

let LoginReduxForm = reduxForm({
    form: 'login'
  })(LoginForm)

const Login = (props) => {
    
    let onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        console.log(props.captchaUrl);
    }

    if (props.isAuth) return <Redirect to="/profile" />

    return  <>
            <h1>
                Login
            </h1>
            <div>
                <LoginReduxForm onSubmit={onSubmit} captchaUrlThunk={captchaUrlThunk} captchaUrl={props.captchaUrl}/>
            </div>
            </>
}

const mapStateToProps = (state) => {
    return {
        isAuth : state.auth.isAuth,
        captchaUrl : state.auth.captchaUrl,
    }
}

export default connect(mapStateToProps, { login, captchaUrlThunk })(Login);