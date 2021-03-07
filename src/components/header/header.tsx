import React from 'react';
import { Button } from 'antd';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import s from './header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getLogin } from '../../redux/selectors/auth-selectors'
import { Row, Col } from 'antd';
import { logout } from '../../redux/auth-reducer';


const { Header } = Layout;



export const HeaderApp: React.FC = () => {
    const isAuth = useSelector(getAuth)
    const login = useSelector(getLogin)
    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }
    return (
        <Header className="header">
            
            <Row gutter={[20,0]}>
                <Col>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/users">
                                Developers
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={17}>

                </Col>
                { isAuth 
                    ?   <>
                        <Col>
                            <p style={{color: 'white'}}>Hi, {login}</p>
                        </Col>
                        <Col>
                        <Button type="primary" ghost onClick={logoutCallback}>Log out</Button>
                        </Col>
                        </>
                    :   <Col>
                            <Link to="/login">
                                <Button className={s.logIn} type="primary" ghost>Log in</Button>
                            </Link>
                        </Col>
                }
            </Row> 
        </Header>
    )
}

