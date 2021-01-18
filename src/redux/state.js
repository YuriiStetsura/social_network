import {rerenderEntireTree} from '../render';

const state = {
    profilePage : {
      posts : [
        { id: "1", post: "Yura", likeCount: "5" },
        { id: "2", post: "Bohdan", likeCount: "10" },
        { id: "3", post: "Ihor", likeCount: "25" },
        { id: "4", post: "Alex", likeCount: "7" }
      ]
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
      ]
    }   
}

export let addPost = (postMessage) => {
    let newPost = {
      id : 5,
      post : postMessage,
      likeCount : 0
    };

    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export default state;

  
  
  
  