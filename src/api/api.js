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
            .then(response => response.data)
    },
    followUser(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    }
}

export const profileUserAPI = {
    getProfileUser(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    auth() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    }
}



