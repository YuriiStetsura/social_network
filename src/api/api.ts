import axios from 'axios';
import { profileUserType } from '../redux/profile-reducer'
import {usersType} from '../type/type'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "b7ae57ba-be52-4b19-8521-ad495dea210d"
    }
})
//type GetUserType
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
        return instance.delete(`follow/${id}`)
    },
    followUser(id: number) {
        return instance.post(`follow/${id}`)        
    }
}
//type profileUserApi

export const profileUserAPI = {
    getProfileUser(userId: number) {
        return instance.get<profileUserType>(`profile/${userId}`)
    },
    setStatusUser(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    updateStatusUser(status: string) {
        return instance.put(`/profile/status`, {status : status})
    },
    uploadProfileImg(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile);

        return instance.put('/profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    updateProfileInfo(profileData: profileUserType) {
        return instance.put('/profile', profileData);
    }
}
//type AuthApi
export enum ResultCodeAuth {
    Success = 0,
    Error = 1
}
type AuthMeType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodeAuth
    message: Array<string>
    fieldsErrors: Array<any>
}
export const authAPI = {
    authMe() {
        return instance.get<AuthMeType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post('/auth/login', {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete('auth/login');
    },
}
//type captcha
type CaptchaUrlType = {
    url: string
}
export const captchaAPI = {
    getCaptcha() {
        return instance.get<CaptchaUrlType>('/security/get-captcha-url')//.then(response => response.data);
    }
}



