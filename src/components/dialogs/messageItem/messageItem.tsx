import React from 'react';

import s from './messageItem.module.css';
type PropsType = {
    text: string
    id: string
}
const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.message}>{props.text}</div>
    )
}
export default Message;