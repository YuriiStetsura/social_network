import React from 'react';
import { Button } from 'antd';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import s from './header.module.css';
import { NavLink } from 'react-router-dom';
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
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Row>
                    <Col span={20}>
                        <Menu.Item key="1">
                            <Link to="/users">
                                Developers
                            </Link>
                        </Menu.Item>
                    </Col>
                    {isAuth 
                        ?   <><Col span={2}>
                                Hi, {login}
                            </Col>
                            <Col span={2}>
                                <Button type="primary" ghost onClick={logoutCallback}>Log out</Button>
                            </Col></>
                        :   <Col span={4}>
                                <NavLink to="/login">
                                    <Button className={s.logIn} type="primary" ghost>Log in</Button>
                                </NavLink>
                            </Col>
                    }
                </Row>

            </Menu>
        </Header>
    )
}

