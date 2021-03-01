import {
  profileUserAPI
} from '../api/profileUser-api';
import { FormAction, stopSubmit } from "redux-form";
import {photosType} from "../type/type";
import { InferActionsType, BaseThunkType } from './redux-store';
import { ResultCodeEnum } from '../api/api';


// initialState Type
type postsType = {
  id: number
  post: string
  likeCount: number
}
export type contactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type profileUserType = {
  userId: number
  aboutMe: string
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

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case 'PROFILE/ADD_POST': {
      // let body = action.posst;
      return {
          ...state,
          posts: [...state.posts, {id: 5, post: action.post, likeCount: 0}]
      }
    }
    case 'PROFILE/SET_USER_PROFILE': {
      return {
        ...state,
        profileUser: action.profile
      }
    }
    case 'PROFILE/SET_STATUS_USER': {
      return {
        ...state,
        status: action.status
      }
    }
    case 'PROFILE/UPDATE_PROFILE_AVATAR': {
      return {
        ...state,
        profileUser : {...state.profileUser, photos: action.newPhoto} as profileUserType
      }
    }
    default:
      return state;
  }

}

//all action type
type ActionsType = ReturnType<InferActionsType<typeof actions>>

//actionCreator

export const actions = {
  addPost: (post: string) => ({
    type: "PROFILE/ADD_POST",
    post
  } as const),
  setUserProfile: (profile: profileUserType) => ({
    type: 'PROFILE/SET_USER_PROFILE',
    profile
  } as const),
  setStatusUser: (status: string) => ({
    type: 'PROFILE/SET_STATUS_USER',
    status,
  } as const),
  updateProfileAvatar: (newPhoto: photosType) => ({
    type: 'PROFILE/UPDATE_PROFILE_AVATAR',
    newPhoto,
  } as const)
}

//Thunk

type ThunkType = BaseThunkType<ActionsType | FormAction>

export const setProfileAvatarThunk = (photoFile: File): ThunkType => async(dispatch) => {
  let response = await profileUserAPI.uploadProfileImg(photoFile);
  if (response.data.resultCode === 0) {
    dispatch(actions.updateProfileAvatar(response.data.data.photos));
    console.log(response.data);
  }
}
export const getProfileUserThunk = (userId: number): ThunkType => async(dispatch) => {
  let response = await profileUserAPI.getProfileUser(userId);
  dispatch(actions.setUserProfile(response.data));
}
export const setStatusUserThunk = (userId: number): ThunkType => async(dispatch) => {
  let response = await profileUserAPI.setStatusUser(userId);
  dispatch(actions.setStatusUser(response.data));
}
export const updateStatusUserThunk = (status: string): ThunkType => async(dispatch) => {
  let response = await profileUserAPI.updateStatusUser(status);
      if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatusUser(status));
      }
}
export const updateProfileInfoThunk = (profileData: profileUserType): ThunkType => async(dispatch, getState) => {
  const _userId = getState().auth.id;
  const response = await profileUserAPI.updateProfileInfo(profileData);
  if(response.data.resultCode === 0) {
    if(_userId != null) {
      dispatch(getProfileUserThunk(_userId));
    } else { throw new Error("userId cant be null") }
  } else {
    const message = response.data.messages[0]
    dispatch(stopSubmit("profileInfo", {_error : message}));
    return Promise.reject(response.data.messages[0]);
  }
}

export default profileReducer;