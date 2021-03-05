import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {
    getUserThunk,
} from '../../redux/users-reducer';
import Users from './Users';
import {
    getPageSize,
    getCurrentPage,
    getTerm,
    getFriend
} from '../../redux/selectors/users-selectors';

const UsersContainer: React.FC = () => {

    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const term = useSelector(getTerm)
    const friend = useSelector(getFriend)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserThunk(currentPage, pageSize, '', null));
    }, [])

    
    return (
        <Users 
                term={term}
                friend={friend}
                currentPage={currentPage}
                pageSize={pageSize}
                getUserThunk={getUserThunk}
                />
    )
}

export const UsersContainerWithAuthRedirect = withAuthRedirect(UsersContainer)





