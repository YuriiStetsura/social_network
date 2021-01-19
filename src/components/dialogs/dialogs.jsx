import React from 'react';
import DialogItem from './dialogItem/dialogItem';

import s from './dialogs.module.css';
import Message from './messageItem/messageItem';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import {updateNewMessageActionCreator, addMessageActionCreator} from '../../redux/state'

const Dialogs = (props) => {
    
    const dialogElement = props.dialogsPage.dialogs.map((d) => {
        return (
            <>
                <Avatar size={60} icon={<UserOutlined />} />
                <DialogItem id={d.id} name={d.name} />
            </>
        )   
    });

    const messageElement = props.dialogsPage.messages.map((m) => {
        return (
            <Message id={m.id} text={m.message} />
        )   
    });

    let inputMessage = React.createRef();

    const updateNewPostMessage = () => {
        let text = inputMessage.current.value;
        props.dispatch(updateNewMessageActionCreator(text));
    }

    const addMessage = () => {
        props.dispatch(addMessageActionCreator());
        props.dispatch(updateNewMessageActionCreator(''));
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                {messageElement}
                <div>
                    <textarea onChange={updateNewPostMessage} 
                              value={props.dialogsPage.newPostMessage}
                              ref={inputMessage} />
                </div>
                <div>
                    <Button onClick={addMessage}
                            type="primary" 
                            ghost>Опублікувати</Button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Dialogs;