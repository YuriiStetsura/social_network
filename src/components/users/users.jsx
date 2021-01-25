import React, { Component } from 'react';
import { Button } from 'antd';
import { Avatar } from 'antd';
import s from './users.module.css';
import * as axios from 'axios';
import { Pagination } from 'antd';

class Users extends Component {
    

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUser(response.data.items);
                    this.props.setUsersTotalCount(response.data.totalCount);
                    console.log(response.data.items);
                });
    }

    onPageChange(p) {
        this.props.onPageChange(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUser(response.data.items);
                });
    }

    render() {
        
        // let allPage = [];

        // for(let i = 1 ; i <= this.props.totalCount; i++) {
        //     allPage.push(i);
        // }

        return <>
            {/* <div>
                {
                    allPage.map(p => 
                    <span onClick={() => { this.onPageChange(p) }}>{p + " "}</span> 
                )}
            </div> */}
            <div className={s.pagination}>
                <Pagination onChange={(e) => { this.onPageChange(e) }} 
                            defaultCurrent={1} 
                            total={this.props.totalCount} 
                            pageSizeOptions={[5]}
                            pageSize={5}
                />
            </div>
            {
                this.props.users.map(u =>
                    <div key={u.id} className={s.user}>
                        <div className={s.avatar}>
                            <Avatar size={80} src={u.photos.small} />
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

