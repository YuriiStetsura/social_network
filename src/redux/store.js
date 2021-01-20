import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

let store = {
  _state: {
    profilePage: {
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
    },

    dialogsPage: {
      dialogs: [{
          id: "1",
          name: "Yura"
        },
        {
          id: "2",
          name: "Bohdan"
        },
        {
          id: "3",
          name: "Ihor"
        },
        {
          id: "4",
          name: "Alex"
        }
      ],

      messages: [{
          id: "1",
          message: "Hi"
        },
        {
          id: "2",
          message: "Hello"
        },
        {
          id: "3",
          message: "Merci"
        },
        {
          id: "4",
          message: "Yeah"
        }
      ],

      newPostMessage: ''

    }
  },

  getState() {
    return this._state;
  },

  _callSubscriber() {
    console.log('State changed');
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    
    this._callSubscriber(this._state);
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  }

}



export default store;