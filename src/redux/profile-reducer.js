import {
  profileUserAPI
} from '../api/api';

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST = "UPDATE_NEW_POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS_USER = 'SET_STATUS_USER';

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
  newPostText: "",
  profileUser: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        post: state.newPostText,
        likeCount: 0
      };
      let stateCopy = {
        ...state
      };
      stateCopy.posts = [...state.posts];
      stateCopy.posts.push(newPost);
      return stateCopy;
    }
    case UPDATE_NEW_POST: {
      let stateCopy = {
        ...state
      };
      stateCopy.newPostText = action.newText;
      return stateCopy;
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
    default:
      return state;
  }

}

//actionCreator

export const updateNewPostMessageActionCreator = (text) => ({
  type: UPDATE_NEW_POST,
  newText: text
});
export const addPostActionCreator = () => ({
  type: ADD_POST
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});
export const setStatusUser = (status) => ({
  type: SET_STATUS_USER,
  status,
})


//Thunk

export const getProfileUserThunk = (userId) => (dispatch) => {
  profileUserAPI.getProfileUser(userId)
    .then(response => {
      dispatch(setUserProfile(response.data));
    });
}
export const setStatusUserThunk = (userId) => (dispatch) => {
  profileUserAPI.setStatusUser(userId)
    .then(response => {
        dispatch(setStatusUser(response.data));
    });
}
export const updateStatusUserThunk = (status) => (dispatch) => {
  profileUserAPI.updateStatusUser(status)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setStatusUser(status))
      }
    });
}

export default profileReducer;