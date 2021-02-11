import {
  profileUserAPI
} from '../api/api';
import { stopSubmit } from "redux-form";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS_USER = 'SET_STATUS_USER';
const UPDATE_PROFILE_AVATAR = 'UPDATE_PROFILE_AVATAR';

let initialState = {
  posts: [{
      id: "1",
      post: "Yura",
      likeCount: "5"
    },
    {
      id: "2",
      post: "Bohdan",
      likeCount: "10"
    },
    {
      id: "3",
      post: "Ihor",
      likeCount: "25"
    },
    {
      id: "4",
      post: "Alex",
      likeCount: "7"
    }
  ],
  profileUser: null,
  status: ''
}
//reducer

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let body = action.post;
      return {
          ...state,
          posts: [...state.posts, {id: 5, post: body, likeCount: 0}]
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
        profileUser : {...state.profileUser, photos: action.newPhoto}
      }
    }
    default:
      return state;
  }

}

//actionCreator

export const addPost = (post) => ({
  type: ADD_POST,
  post
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});
export const setStatusUser = (status) => ({
  type: SET_STATUS_USER,
  status,
});
export const updateProfileAvatar = (newPhoto) => ({
  type: UPDATE_PROFILE_AVATAR,
  newPhoto,
})


//Thunk

export const setProfileAvatarThunk = (photoFile) => async(dispatch) => {
  let response = await profileUserAPI.uploadProfileImg(photoFile);
  if (response.data.resultCode === 0) {
    dispatch(updateProfileAvatar(response.data.data.photos));
  }
}
export const getProfileUserThunk = (userId) => async(dispatch) => {
  let response = await profileUserAPI.getProfileUser(userId);
  dispatch(setUserProfile(response.data));
}
export const setStatusUserThunk = (userId) => async(dispatch) => {
  let response = await profileUserAPI.setStatusUser(userId);
  dispatch(setStatusUser(response.data));
}
export const updateStatusUserThunk = (status) => async(dispatch) => {
  let response = await profileUserAPI.updateStatusUser(status);
      if (response.data.resultCode === 0) {
        dispatch(setStatusUser(status));
      }
}
export const updateProfileInfoThunk = (profileData) => async(dispatch, getState) => {
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