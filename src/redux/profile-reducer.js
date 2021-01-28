import { profileUserAPI } from '../api/api';

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST = "UPDATE_NEW_POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';

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
  profileUser: null
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

//Thunk

export const getProfileUserThunk = (userId) => (dispatch) => {
  profileUserAPI.getProfileUser(userId)
    .then(data => {
      dispatch(setUserProfile(data));
    });
}

export default profileReducer;