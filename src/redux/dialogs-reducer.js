const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE';
const ADD_MESSAGE = "ADD_MESSAGE";

let initialState = {
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

const dialogsReducer = (state=initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE: {
          let newMessage = {
            id: '5',
            message: state.newPostMessage
          }
          let stateCopy = {...state};
          stateCopy.messages = [...state.messages];
          stateCopy.messages.push(newMessage);
          return stateCopy;
        }
        case UPDATE_NEW_MESSAGE: {
          let stateCopy = {...state};
          stateCopy.newPostMessage = action.newText;
          return stateCopy;
        }
        default:
          return state;
      }

}

export const updateNewMessageActionCreator = (text) => ({ type: UPDATE_NEW_MESSAGE, newText: text});
export const addMessageActionCreator = () => ({ type: ADD_MESSAGE});

export default dialogsReducer;