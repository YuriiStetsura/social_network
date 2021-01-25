import React from 'react';
import { Button } from 'antd';
import { Avatar } from 'antd';
import s from './users.module.css';
import * as axios from 'axios';

const Users = (props) => {

    let getUser = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    props.setUser(response.data.items);
                });
        }
    }

    return <>
        <button onClick={getUser}>Get Users</button>
        {
            props.users.map(u =>
                <div key={u.id} className={s.user}>
                    <div className={s.avatar}>
                        <Avatar size={80} src={u.imgSrc} />
                    </div>
                    <div className={s.subscribe}>
                        {u.followed
                            ? <Button onClick={() => { props.unfollow(u.id) }} type="primary" ghost>Follow</Button>
                            : <Button onClick={() => { props.follow(u.id) }} type="primary" ghost>Unfollow</Button>
                        }
                    </div>
                    <div className={s.content}>
                        <div className={s.profileName}>
                            {u.name}
                        </div>
                        <div className={s.status}>
                            {"u.status"}
                        </div>
                        <div className={s.country}>
                            {"u.location.country"}
                        </div>
                        <div className={s.city}>
                            {"u.location.city"}
                        </div>
                    </div>
                </div>
            )
        }
    </>

}

export default Users;