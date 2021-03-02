import React from 'react';
import s from './dialogItem.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    name: string
    id: string
}
const DialogItem: React.FC<PropsType> = (props) => {

    let path = "/dialog/" + props.id;

    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;