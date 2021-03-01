import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { SelectField } from '../common/FormsControls/FormsControls';
import { required, maxLength } from '../common/utils/validation';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { appStateType } from '../../redux/redux-store'

const maxLengthValue = maxLength(30);
const Input = SelectField("input");

type LoginFormReduxOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormReduxOwnProps> & LoginFormReduxOwnProps> = (props) => {

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
                <Button type="primary" htmlType="submit" ghost >Sign In</Button>
            </div>
        </form>
    )
} 

let LoginReduxForm = reduxForm<LoginFormDataType, LoginFormReduxOwnProps>({
    form: 'login'
  })(LoginForm)

//type Login props
type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
///
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({login, isAuth, captchaUrl}) => {
    
    const onSubmit = (formData: LoginFormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (isAuth) return <Redirect to="/profile" />

    return  <>
            <h1>
                Login
            </h1>
            <div>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
            </div>
            </>
}

const mapStateToProps = (state: appStateType): MapStatePropsType => {
    return {
        isAuth : state.auth.isAuth,
        captchaUrl : state.auth.captchaUrl,
    }
}

export default connect(mapStateToProps, { login })(Login);