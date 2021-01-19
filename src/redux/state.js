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
    if (action.type === "ADD-POST") {

    }
    switch (action.type) {
      case 'ADD-POST':
        let newPost = {
          id: 5,
          post: this._state.profilePage.newPostText,
          likeCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._callSubscriber(this._state);
        break;

      case 'UPDATE-NEW_POST':
        this._state.profilePage.newPostText = action.newText;
        this._callSubscriber(this._state);
        break;

      case 'ADD-MESSAGE':
        let newMessage = {
          id: '5',
          message: this._state.dialogsPage.newPostMessage
        }
        this._state.dialogsPage.messages.push(newMessage);
        this._callSubscriber(this._state);
        break;

      case 'UPDATE-NEW_MESSAGE':
        this._state.dialogsPage.newPostMessage = action.newText;
        this._callSubscriber(this._state);
        break;
      default:
        console.log("Error");
    }
  },

  // addPost() {
  //   let newPost = {
  //     id : 5,
  //     post : this._state.profilePage.newPostText,
  //     likeCount : 0
  //   };

  //   this._state.profilePage.posts.push(newPost);
  //   this._callSubscriber(this._state);
  // },

  // updateNewPostText(newText) {
  //   this._state.profilePage.newPostText = newText;
  //   this._callSubscriber(this._state);
  // },

  // updateNewPostMessage(newText) {
  //   this._state.dialogsPage.newPostMessage = newText;
  //   this._callSubscriber(this._state);
  // },

  // addMessage() {
  //   let newMessage = {
  //     id: '5',
  //     message: this._state.dialogsPage.newPostMessage
  //   }

  //   this._state.dialogsPage.messages.push(newMessage);
  //   this._callSubscriber(this._state);
  // },

  subscribe(observer) {
    this._callSubscriber = observer;
  }

}

export default store;