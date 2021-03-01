import axios from 'axios';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "b7ae57ba-be52-4b19-8521-ad495dea210d"
    }
})

export type APIResponseType<D = {}, RC = ResultCodeEnum > = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptcha {
    CaptchaRequired = 10
}






