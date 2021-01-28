import React from 'react';
import { Button } from 'antd';
import { Avatar } from 'antd';
import s from './users.module.css';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import { NavLink } from 'react-router-dom';



let Users = (props) => {
    console.log(props);
    let skeletonSize = [];

    for(let i = 1 ; i <= props.pageSize; i++) {
        skeletonSize.push(i);
    }

    return (
        <>
            <div className={s.pagination}>
                <Pagination onChange={(e) => { props.onPageChange(e)  }}
                    defaultCurrent={props.currentPage}
                    total={props.totalCount}
                    pageSizeOptions={[5]}
                    pageSize={5}
                />
            </div>

            {props.isFetching
                ? skeletonSize.map(s => 
                    <Skeleton active />)
                : props.users.map(u =>
                    <div key={u.id} className={s.user}>

                        <div className={s.avatar}>
                            <NavLink to={"/profile/" + u.id}>
                                <Avatar size={80} src={u.photos.small} />
                            </NavLink>   
                        </div>

                        <div className={s.subscribe}>
                            {u.followed
                                ? <Button disabled={props.btnDisabled.some(id => id === u.id )}
                                    onClick={() => { props.unfollowThunk(u.id) }} 
                                    type="primary" ghost>Відписатися</Button>

                                : <Button disabled={props.btnDisabled.some(id => id === u.id)}
                                    onClick={() => { props.followThunk(u.id) }} 
                                    type="primary" ghost>Підписатися</Button>
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