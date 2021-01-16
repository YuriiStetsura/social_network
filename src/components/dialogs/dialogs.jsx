import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './dialogs.module.css';

const DialogItem = (props) => {

    let path = "/dialog/" + props.id;

    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink> 
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                <DialogItem name="Yura" id="1"/>
                <DialogItem name="Bohdan" id="2"/>
                <DialogItem name="Ihor" id="3"/>
                <DialogItem name="Alex" id="4"/>
            </div>
            <div className={s.messages}>
                <Message message="Hi"/>
                <Message message="Hello"/>
                <Message message="Merci"/>
            </div>
        </div>
    )
}

export default Dialogs;