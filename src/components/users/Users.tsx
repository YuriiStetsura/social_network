import React, { useEffect } from 'react';
import { Button } from 'antd';
import { Avatar } from 'antd';
import s from './users.module.css';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import { NavLink } from 'react-router-dom';
import SearchUsers from './search-users';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTotalCount,
    getUsers,
    getIsFetching,
    getfollowingUsersId
} from '../../redux/selectors/users-selectors';
import { unfollowThunk, followThunk } from '../../redux/users-reducer';
import * as queryString from 'querystring'
import { useHistory } from 'react-router';

type PropsType = {
    pageSize: number
    currentPage: number
    getUserThunk: (currentPage: number, pageSize: number, term: string | null, firend: boolean | null) => void
    term: string | null
    friend: boolean | null
}

const Users: React.FC<PropsType> = ({term, friend, currentPage, pageSize, getUserThunk}) => {
    let skeletonSize = [];

    for(let i = 1 ; i <= pageSize; i++) {
        skeletonSize.push(i);
    }

    const totalCount = useSelector(getTotalCount)
    const users = useSelector(getUsers)
    const isFetching =useSelector(getIsFetching)
    const followingUsersId = useSelector(getfollowingUsersId)
    const history = useHistory()


    const dispatch = useDispatch();
    

    const onPageChange = (currentPage: number, term: string | null = '', friend: boolean | null = null) => {
        dispatch(getUserThunk(currentPage, pageSize, term, friend));
    }

    const unfollow = (id: number) => {
        dispatch(unfollowThunk(id))
    }
    const follow = (id: number) => {
        dispatch(followThunk(id))
    }

    return (
        <>
            <div className={s.pagination}>
                <Pagination onChange={(e) => { onPageChange(e, term, friend)  }}
                            defaultCurrent={1}
                            current={currentPage}
                            total={totalCount}
                            pageSizeOptions={["5"]}
                            pageSize={5}
                />
            </div>

            <div>
                <SearchUsers    getUserThunk={getUserThunk}/>
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
                                    onClick={() => { unfollow(u.id) }} 
                                    type="primary" ghost>Відписатися</Button>

                                : <Button disabled={followingUsersId.some(id => id === u.id)}
                                    onClick={() => { follow(u.id) }} 
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