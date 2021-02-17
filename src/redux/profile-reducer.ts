import {
  profileUserAPI
} from '../api/api';
import { stopSubmit } from "redux-form";
import {photosType} from "../type/type";

const ADD_POST = "PROFILE/ADD_POST";
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE';
const SET_STATUS_USER = 'PROFILE/SET_STATUS_USER';
const UPDATE_PROFILE_AVATAR = 'PROFILE/UPDATE_PROFILE_AVATAR';


// initialState Type
type postsType = {
  id: number
  post: string
  likeCount: number
}
type contactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
type profileUserType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: boolean
  fullName: string
  contacts: contactsType
  photos: photosType
}

export type initialStateType = typeof initialState

///
let initialState = {
  posts: [{
      id: 1,
      post: "Yura",
      likeCount: 5
    },
    {
      id: 2,
      post: "Bohdan",
      likeCount: 10
    },
    {
      id: 3,
      post: "Ihor",
      likeCount: 25
    },
    {
      id: 4,
      post: "Alex",
      likeCount: 7
    }
  ] as Array<postsType>,
  profileUser: null as profileUserType | null,
  status: ''
}
//reducer

const profileReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case ADD_POST: {
      // let body = action.posst;
      return {
          ...state,
          posts: [...state.posts, {id: 5, post: action.post, likeCount: 0}]
      }
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profileUser: action.profile
      }
    }
    case SET_STATUS_USER: {
      return {
        ...state,
        status: action.status
      }
    }
    case UPDATE_PROFILE_AVATAR: {
      return {
        ...state,
        profileUser : {...state.profileUser, photos: action.newPhoto} as profileUserType
      }
    }
    default:
      return state;
  }

}

//action Type

type addPostType = {
  type: typeof ADD_POST
  post: string
}
type setUserProfileType = {
  type: typeof SET_USER_PROFILE
  profile: profileUserType
}
type setStatusUserType = {
  type: typeof SET_STATUS_USER
  status: string
}
type updateProfileAvatarType = {
  type: typeof UPDATE_PROFILE_AVATAR
  newPhoto: photosType
}

//actionCreator

export const addPost = (post: string): addPostType => ({
  type: ADD_POST,
  post
});
export const setUserProfile = (profile: profileUserType): setUserProfileType => ({
  type: SET_USER_PROFILE,
  profile
});
export const setStatusUser = (status: string): setStatusUserType => ({
  type: SET_STATUS_USER,
  status,
});
export const updateProfileAvatar = (newPhoto: photosType): updateProfileAvatarType => ({
  type: UPDATE_PROFILE_AVATAR,
  newPhoto,
})


//Thunk

export const setProfileAvatarThunk = (photoFile: any) => async(dispatch: any) => {
  let response = await profileUserAPI.uploadProfileImg(photoFile);
  if (response.data.resultCode === 0) {
    dispatch(updateProfileAvatar(response.data.data.photos));
  }
}
export const getProfileUserThunk = (userId: number) => async(dispatch: any) => {
  let response = await profileUserAPI.getProfileUser(userId);
  dispatch(setUserProfile(response.data));
}
export const setStatusUserThunk = (userId: number) => async(dispatch: any) => {
  let response = await profileUserAPI.setStatusUser(userId);
  dispatch(setStatusUser(response.data));
}
export const updateStatusUserThunk = (status: string) => async(dispatch: any) => {
  let response = await profileUserAPI.updateStatusUser(status);
      if (response.data.resultCode === 0) {
        dispatch(setStatusUser(status));
      }
}
export const updateProfileInfoThunk = (profileData: profileUserType) => async(dispatch: any, getState: any) => {
  const userId = getState().auth.id;
  const response = await profileUserAPI.updateProfileInfo(profileData);
  if( response.data.resultCode === 0) {
    dispatch(getProfileUserThunk(userId));
  } else {
    const message = response.data.messages[0]
    dispatch(stopSubmit("profileInfo", {_error : message}));
    return Promise.reject(response.data.messages[0]);
  }
}

export default profileReducer;