import React from 'react';
import { Button } from 'antd';
import { Avatar } from 'antd';
import s from './users.module.css';
import { Pagination } from 'antd';

let Users = (props) => {
    // console.log(props.onPageChange);
    // let allPage = [];

    // for(let i = 1 ; i <= this.props.totalCount; i++) {
    //     allPage.push(i);
    // }



    return (
        <>
            {/* <div>
                {
                    allPage.map(p => 
                    <span onClick={() => { this.onPageChange(p) }}>{p + " "}</span> 
                )}
            </div> */}
            <div className={s.pagination}>
                <Pagination onChange={(e) => { props.onPageChange(e) }}
                    defaultCurrent={1}
                    total={props.totalCount}
                    pageSizeOptions={[5]}
                    pageSize={5}
                />
            </div>
            {
                props.users.map(u =>
                    <div key={u.id} className={s.user}>
                        <div className={s.avatar}>
                            <Avatar size={80} src={u.photos.small} />
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
    )
}

export default Users;