import React from 'react';
import { Button } from 'antd';

import s from'./header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
                <img src="https://www.freeiconspng.com/uploads/logo-twitter-transparent-background-10.png" alt="img"/>
                {props.isAuth 
                    ? <div className={s.logIn}>Hi, {props.login}</div>
                    : <NavLink to="/login">
                        <Button className={s.logIn} type="primary" ghost>Log in</Button>
                      </NavLink>
                }
                       
        </header>
    )
}

export default Header;