const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST = "UPDATE_NEW_POST";

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

  newPostText: ""
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        post: state.newPostText,
        likeCount: 0
      };
      let stateCopy = {...state};
      stateCopy.posts = [...state.posts];
      stateCopy.posts.push(newPost);
      return stateCopy;
    }
    case UPDATE_NEW_POST: {
      let stateCopy = {...state};
      stateCopy.newPostText = action.newText;
      return stateCopy;
    }
    default:
      return state;
  }

}

export const updateNewPostMessageActionCreator = (text) => ({
  type: UPDATE_NEW_POST,
  newText: text
});

export const addPostActionCreator = () => ({
  type: ADD_POST
});

export default profileReducer;