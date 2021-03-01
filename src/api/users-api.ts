import { AxiosPromise } from 'axios'
import {usersType} from '../type/type'
import {instance, APIResponseType} from './api'

type GetUserType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}

export const userAPI = {
    getUser(currentPage: number, pageSize: number) {
        return instance.get<GetUserType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`) as AxiosPromise<APIResponseType>
    },
    followUser(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)        
    }
}