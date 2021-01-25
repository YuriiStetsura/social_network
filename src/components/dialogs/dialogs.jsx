import React from 'react';
import DialogItem from './dialogItem/dialogItem';

import s from './dialogs.module.css';
import Message from './messageItem/messageItem';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';


const Dialogs = (props) => {
    
    const dialogElement = props.dialogs.map((d) => {
        return (
            <>
                <Avatar size={60} icon={<UserOutlined />} />
                <DialogItem id={d.id} name={d.name} />
            </>
        )   
    });

    const messageElement = props.messages.map((m) => {
        return (
            <Message id={m.id} text={m.message} />
        )   
    });

    let inputMessage = React.createRef();

    const onUpdateNewPostMessage = () => {
        let text = inputMessage.current.value;
        props.updateNewPostMessage(text);
    }

    const onAddMessage = () => {
        props.addMessage();
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                {messageElement}
                <div>
                    <textarea onChange={onUpdateNewPostMessage} 
                              value={props.newPostMessage}
                              ref={inputMessage} />
                </div>
                <div>
                    <Button onClick={onAddMessage}
                            type="primary" 
                            ghost>Опублікувати</Button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Dialogs;