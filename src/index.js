import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/app/app';
import state from './redux/state';
import {addPost} from './redux/state';
import {updateNewPostText} from './redux/state';
import {updateNewPostMessage} from './redux/state';
import {addMessage} from './redux/state';
import {subscribe} from './redux/state';

let rerenderEntireTree = (state) => {
    ReactDOM.render(
      <React.StrictMode>
        <App state={state}
             addPost={addPost}
             updateNewPostText={updateNewPostText}
             updateNewPostMessage={updateNewPostMessage}
             addMessage={addMessage}
              />  
      </React.StrictMode>,
      document.getElementById('root')
    );
};

rerenderEntireTree(state);
subscribe(rerenderEntireTree);



