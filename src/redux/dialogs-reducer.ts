import { InferActionsType } from './redux-store'


export type dialogsType = {
  id: string
  name: string
}
export type messagesType = {
  id: string
  message: string
}

type initialStateType = typeof initialState;

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

const dialogsReducer = (state=initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'DIALOGS/ADD_MESSAGE': {
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

//all action type
export type ActionsType = ReturnType<InferActionsType<typeof actions>>

//actionCreator
export const actions = {
  addMessage : (message: string) => ({ type: "DIALOGS/ADD_MESSAGE", message} as const),
}

export default dialogsReducer;