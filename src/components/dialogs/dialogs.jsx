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
        <div className={s.message}>{props.text}</div>
    )
}

const Dialogs = () => {

    const dialogs = [
        { id: "1", name: "Yura" },
        { id: "2", name: "Bohdan" },
        { id: "3", name: "Ihor" },
        { id: "4", name: "Alex" }
    ];

    const messages = [
        { id: "1", message: "Hi" },
        { id: "2", message: "Hello" },
        { id: "3", message: "Merci" },
        { id: "4", message: "Yeah" }
    ];

    const dialogElement = dialogs.map((d) => {
        return (
            <DialogItem id={d.id} name={d.name} />
        )   
    });

    const messageElement = messages.map((m) => {
        return (
            <Message id={m.id} text={m.message} />
        )   
    });


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                {messageElement}
            </div>
        </div>
    )
}

export default Dialogs;