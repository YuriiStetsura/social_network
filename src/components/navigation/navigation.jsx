import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './navigation.module.css';


const Navigation = () => {
    return (
        <nav className={s.nav}>
                <div className={s.item}>
                    <NavLink to="/profile"
                             activeClassName={s.activeLink}>
                    Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/friend"
                             activeClassName={s.activeLink}>
                    MyFriend</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/dialogs"
                             activeClassName={s.activeLink}>
                    Message</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/news"
                             activeClassName={s.activeLink}>
                    News</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/music"
                             activeClassName={s.activeLink}>
                    Music</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/settings"
                             activeClassName={s.activeLink}>
                    Settings</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/users"
                             activeClassName={s.activeLink}>
                    Users</NavLink>
                </div>
            </nav>
    )
}

export default Navigation;