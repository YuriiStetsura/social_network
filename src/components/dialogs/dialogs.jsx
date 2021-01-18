import React from 'react';
import DialogItem from './dialogItem/dialogItem';

import s from './dialogs.module.css';
import Message from './messageItem/messageItem';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

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

    let newMessage = React.createRef();

    let addMessage = () => {
        props.addMessage();
        props.updateNewPostMessage('');
    }

    let onMessageChange = () => {
        let text = newMessage.current.value;
        props.updateNewPostMessage(text);
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                {messageElement}
                <div>
                    <textarea onChange={onMessageChange} 
                              value={props.dialogsPage.newPostMessage} 
                              ref={newMessage} 
                    />
                </div>
                <div>
                    <Button type="primary" ghost onClick={ addMessage }>Опублікувати</Button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Dialogs;