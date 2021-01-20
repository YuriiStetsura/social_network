import React from 'react';

import Dialogs from './dialogs';
import s from './dialogs.module.css';

import {updateNewMessageActionCreator, addMessageActionCreator} from '../../redux/dialogs-reducer';

const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage;
    

    const updateNewPostMessage = (text) => {
        props.store.dispatch(updateNewMessageActionCreator(text));
    }

    const addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
        props.store.dispatch(updateNewMessageActionCreator(''));
    }

    return (
       <Dialogs updateNewPostMessage={updateNewPostMessage} 
                addMessage={addMessage}
                dialogs={state.dialogs}
                messages={state.messages}
                newPostMessage={state.newPostMessage}/>
    )
}

export default DialogsContainer;