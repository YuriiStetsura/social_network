import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/app/app';
import store from './redux/state';

let rerenderEntireTree = (state) => {
    ReactDOM.render(
      <React.StrictMode>
        <App state={store.getState()}
             addPost={store.addPost.bind(store)}
             updateNewPostText={store.updateNewPostText.bind(store)}
             updateNewPostMessage={store.updateNewPostMessage.bind(store)}
             addMessage={store.addMessage.bind(store)}
              />  
      </React.StrictMode>,
      document.getElementById('root')
    );
};

rerenderEntireTree(store.getState());
store.subscribe(rerenderEntireTree);



