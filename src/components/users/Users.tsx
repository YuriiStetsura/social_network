import React from 'react';
import { Button } from 'antd';
import { Avatar } from 'antd';
import s from './users.module.css';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import { NavLink } from 'react-router-dom';
import { usersType } from '../../type/type';

type propsType = {
    pageSize: number
    onPageChange: (e: number) => void
    totalCount: number
    currentPage: number
    isFetching: boolean
    users: Array<usersType>
    followingUsersId: Array<number>
    unfollowThunk: (id: number) => void
    followThunk: (id: number) => void
}

let Users: React.FC<propsType> = ({pageSize, onPageChange, totalCount,
    currentPage, isFetching, users, followingUsersId, unfollowThunk, followThunk}) => {
    
    let skeletonSize = [];

    for(let i = 1 ; i <= pageSize; i++) {
        skeletonSize.push(i);
    }

    return (
        <>
            <div className={s.pagination}>
                <Pagination onChange={(e) => { onPageChange(e)  }}
                            defaultCurrent={currentPage}
                            total={totalCount}
                            pageSizeOptions={["5"]}
                            pageSize={5}
                />
            </div>

            {isFetching
                ? skeletonSize.map(s => 
                    <div key={Math.random()}><Skeleton active /></div>)
                : users.map(u =>
                    <div key={u.id} className={s.user}>

                        <div className={s.avatar}>
                            <NavLink to={"/profile/" + u.id}>
                                <Avatar size={80} src={u.photos.small} />
                            </NavLink>   
                        </div>

                        <div className={s.subscribe}>
                            {u.followed
                                ? <Button disabled={followingUsersId.some(id => id === u.id )}
                                    onClick={() => { unfollowThunk(u.id) }} 
                                    type="primary" ghost>Відписатися</Button>

                                : <Button disabled={followingUsersId.some(id => id === u.id)}
                                    onClick={() => { followThunk(u.id) }} 
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