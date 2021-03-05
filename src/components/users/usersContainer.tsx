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
import { useHistory } from 'react-router';
import * as queryString from 'querystring'

const UsersContainer: React.FC = () => {

    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const term = useSelector(getTerm)
    const friend = useSelector(getFriend)
    const history = useHistory()
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))
        
        let actualTerm = term
        let actualPage = currentPage
        let actualFriend = friend
        if (!!parsed.term) actualTerm = parsed.term as string
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.friend) actualFriend = parsed.friend === "null" ? null : parsed.friend === "true" ? true : false

        dispatch(getUserThunk(actualPage, pageSize, actualTerm, actualFriend));
    }, [])

    useEffect(() => {
        history.push({
            pathname: '/users',
            search: `?term=${term}&friend=${friend}&page=${currentPage}`
        })

    }, [currentPage, term, friend])

    
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





