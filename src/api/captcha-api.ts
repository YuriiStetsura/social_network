import {instance} from './api'

type CaptchaUrlType = {
    url: string
}
export const captchaAPI = {
    getCaptcha() {
        return instance.get<CaptchaUrlType>('/security/get-captcha-url')//.then(response => response.data);
    }
}