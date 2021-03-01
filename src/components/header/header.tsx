import React from 'react';
import { Button } from 'antd';

import s from'./header.module.css';
import { NavLink } from 'react-router-dom';


type propsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<propsType> = ({isAuth, login, logout}) => {
    
    return (
        <header className={s.header}>
                <img src="https://www.freeiconspng.com/uploads/logo-twitter-transparent-background-10.png" alt="img"/>
                {isAuth 
                    ? <div className={s.logIn}>
                        Hi, {login}
                        <Button type="primary" ghost onClick={logout}>Log out</Button>
                      </div>
                    : <NavLink to="/login">
                        <Button className={s.logIn} type="primary" ghost>Log in</Button>
                      </NavLink>
                }            
        </header>
    )
}

export default Header;