const ADD_MESSAGE: string = "DIALOGS/ADD_MESSAGE";

type dialogsType = {
  id: string
  name: string
}
type messagesType = {
  id: string
  message: string
}

export type initialStateType = typeof initialState;

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
] as Array<dialogsType>,

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
] as Array<messagesType>,
}

const dialogsReducer = (state=initialState, action: any): initialStateType => {

    switch (action.type) {
        case ADD_MESSAGE: {
          let body = action.message;
          return {
            ...state,
            messages: [...state.messages, {id: "5", message: body}]
          }
        }
        default:
          return state;
      }

}
//typeAction

type addMessageActionType = {
  type: typeof ADD_MESSAGE
  message: string
}

//

export const addMessage = (message: string): addMessageActionType => ({ type: ADD_MESSAGE, message});

export default dialogsReducer;