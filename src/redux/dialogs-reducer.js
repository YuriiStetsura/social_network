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
}

const dialogsReducer = (state=initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE: {
          let body = action.message;
          return {
            ...state,
            messages: [...state.messages, {id: 5, message: body}]
          }
        }
        default:
          return state;
      }

}

export const addMessage = (message) => ({ type: ADD_MESSAGE, message});

export default dialogsReducer;