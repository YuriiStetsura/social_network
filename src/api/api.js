import * as axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "b7ae57ba-be52-4b19-8521-ad495dea210d"
    }
})

export const userAPI = {
    getUser(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
    },
    followUser(id) {
        return instance.post(`follow/${id}`)        
    }
}

export const profileUserAPI = {
    getProfileUser(userId) {
        return instance.get(`profile/${userId}`)
    },
    setStatusUser(userId) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatusUser(status) {
        return instance.put(`/profile/status`, {status : status})
    },
    uploadProfileImg(photoFile) {
        let formData = new FormData();
        formData.append('image', photoFile);

        return instance.put('/profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    updateProfileInfo(profileData) {
        return instance.put('/profile', profileData);
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}



