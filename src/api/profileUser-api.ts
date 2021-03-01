import {instance, APIResponseType} from './api'
import { profileUserType } from '../redux/profile-reducer'

type PhotosDataType = {
    photos: {
        small: string | null
        large: string | null
    }
}

export const profileUserAPI = {
    getProfileUser(userId: number) {
        return instance.get<profileUserType>(`profile/${userId}`)
    },
    setStatusUser(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    updateStatusUser(status: string) {
        return instance.put<APIResponseType>(`/profile/status`, {status : status})
    },
    uploadProfileImg(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<APIResponseType<PhotosDataType>>('/profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    updateProfileInfo(profileData: profileUserType) {
        return instance.put<APIResponseType>('/profile', profileData);
    }
}