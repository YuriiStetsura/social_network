import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/app/app';
import {addPost} from './redux/state';
import {updateNewPostText} from './redux/state';
import {updateNewPostMessage} from './redux/state';
import {addMessage} from './redux/state';

export let rerenderEntireTree = (state) => {
    ReactDOM.render(
      <React.StrictMode>
        <App state={state}
             addPost={addPost}
             updateNewPostText={updateNewPostText}
             addMessage={addMessage}
             updateNewPostMessage={updateNewPostMessage} />  
      </React.StrictMode>,
      document.getElementById('root')
    );
};





