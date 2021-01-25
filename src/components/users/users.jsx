import React, { Component } from 'react';
import { Button } from 'antd';
import { Avatar } from 'antd';
import s from './users.module.css';
import * as axios from 'axios';

class Users extends Component {
    
    getUser = () => {
        if (this.props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    this.props.setUser(response.data.items);
                });
        }
    }

    render() {
        return <>
            <button onClick={this.getUser}>Get Users</button>
            {
                this.props.users.map(u =>
                    <div key={u.id} className={s.user}>
                        <div className={s.avatar}>
                            <Avatar size={80} src={u.imgSrc} />
                        </div>
                        <div className={s.subscribe}>
                            {u.followed
                                ? <Button onClick={() => { this.props.unfollow(u.id) }} type="primary" ghost>Follow</Button>
                                : <Button onClick={() => { this.props.follow(u.id) }} type="primary" ghost>Unfollow</Button>
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
}

export default Users;

