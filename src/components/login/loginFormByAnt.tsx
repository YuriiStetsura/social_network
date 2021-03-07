import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, ExclamationOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getCaptchaUrl, getAuth, getErrorAuth } from '../../redux/selectors/auth-selectors'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom';
import { actions } from '../../redux/auth-reducer'
import { Alert } from 'antd';

type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const LoginFormByAnt = () => {

    const captchaUrl = useSelector(getCaptchaUrl)
    const errorAuth = useSelector(getErrorAuth)
    const dispatch = useDispatch()

    const onFinish = (values: LoginFormDataType) => {
        dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
        dispatch(actions.setCaptcha(''))
        dispatch(actions.setErrorsAuth(null))
    };

    return (
        <Row>
            <Col span={9}>
            </Col>
            <Col span={6}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    
                        <a style={{float: 'right'}} href="">
                            Forgot password
                        </a>
                        
                    </Form.Item>
                    {captchaUrl && <Form.Item><img src={captchaUrl} alt="captcha"/></Form.Item>}
                    {captchaUrl &&
                    <Form.Item
                        name="captcha"
                        rules={[{ required: true, message: 'Please input captcha!' }]}
                    >
                        <Input prefix={<ExclamationOutlined className="site-form-item-icon" />} placeholder="Captcha" />
                    </Form.Item>
                    }
                    {errorAuth 
                        ?   <Form.Item>
                                <Alert message={errorAuth} type="error" showIcon /> 
                            </Form.Item>
                        :   undefined}
                    
                    <Form.Item>
                        
                        <Button style={{ width: 100 + "%"}} type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={9}>
            </Col>
        </Row>

    );
};

export const LoginAntDesign = () => {

    const isAuth = useSelector(getAuth)

    if (isAuth) return <Redirect to="/profile" />

    return (
        <>
            <h1 style = {{textAlign: 'center'}}>
                Sign In
            </h1>
            <div>
                <LoginFormByAnt/>
            </div>
        </>
    )
}


