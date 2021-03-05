import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './navigation.module.css';
import { Avatar } from 'antd';
import { connect } from 'react-redux'
import { appStateType } from '../../redux/redux-store'
import { getUserThunk } from '../../redux/users-reducer';

const Navigation: React.FC<PropsType> = (props) => {
    
    // useEffect(() => {
    //    props.getUserThunk(1,6,'',true)
    // },[]);
    
    return (
        <>
        <div className={s.nav}>
            <nav className={s.navbar}>
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
            <div className={s.friend}>
            {/* {props.users.map(user =>     
                <>
                <NavLink to={"/profile/" + user.id}>
                    <Avatar size={40} src={user.photos.small}/>
                </NavLink>   
                </>
            )} */}
            </div>
        </div>
        
            </>
    )
}
type PropsType = MapStatePropsType & MapDispatchPropsType
type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserThunk: (currentPage: number, pageSize: number, term: string | null, firend: boolean | null) => void
}
let mapStateToProps = (state: appStateType) => ({
    users: state.usersPage.users
})

export default connect(mapStateToProps, {getUserThunk})(Navigation);