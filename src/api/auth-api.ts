import {instance} from './api'
import {ResultCodeEnum, ResultCodeCaptcha} from './api'
import {APIResponseType} from './api'


type AuthMeDataType = {
    id: number, email: string, login: string

}
type LoginDataType = {
    userId: number
}
export const authAPI = {
    authMe() {
        return instance.get<APIResponseType<AuthMeDataType>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginDataType, ResultCodeCaptcha | ResultCodeEnum>>
            ('/auth/login', {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete('auth/login');
    },
}