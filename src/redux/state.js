let rerenderEntireTree = () => {
    console.log('State changed');
}

const state = {
    profilePage : {
      posts : [
        { id: "1", post: "Yura", likeCount: "5" },
        { id: "2", post: "Bohdan", likeCount: "10" },
        { id: "3", post: "Ihor", likeCount: "25" },
        { id: "4", post: "Alex", likeCount: "7" }
      ],

      newPostText: ""
    },

    dialogsPage : {
      dialogs : [
        { id: "1", name: "Yura" },
        { id: "2", name: "Bohdan" },
        { id: "3", name: "Ihor" },
        { id: "4", name: "Alex" }
      ],

      messages : [
        { id: "1", message: "Hi" },
        { id: "2", message: "Hello" },
        { id: "3", message: "Merci" },
        { id: "4", message: "Yeah" }
      ],

      newPostMessage : ''

    }   
}

export let addPost = () => {
    let newPost = {
      id : 5,
      post : state.profilePage.newPostText,
      likeCount : 0
    };

    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export let updateNewPostText = (newText) => {

  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
}

export let updateNewPostMessage = (newText) => {
    state.dialogsPage.newPostMessage = newText;
    rerenderEntireTree(state);
}

export let addMessage = () => {
    let newMessage = {
        id: '5',
        message: state.dialogsPage.newPostMessage
    }

    state.dialogsPage.messages.push(newMessage);
    rerenderEntireTree(state);
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
} 


export default state;

  
  
  
  