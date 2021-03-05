import { AxiosPromise } from 'axios'
import {usersType} from '../type/type'
import {instance, APIResponseType} from './api'

type GetUserType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}

export const userAPI = {
    getUser(currentPage: number, pageSize: number, term: string | null, friend: boolean | null) {
        return instance.get<GetUserType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`) as AxiosPromise<APIResponseType>
    },
    followUser(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)        
    },
    showMyfriend() {
        return instance.get<GetUserType>('users?friend=true&count=6')
    },

}