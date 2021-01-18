import React from 'react';

import s from './messageItem.module.css';

const Message = (props) => {
    return (
        <div className={s.message}>{props.text}</div>
    )
}
export default Message;