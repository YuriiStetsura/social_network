import React from 'react';
import DialogItem from './dialogItem/dialogItem';
import s from './dialogs.module.css';
import Message from './messageItem/messageItem';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Field, reduxForm } from 'redux-form';
import { SelectField } from '../common/FormsControls/FormsControls';
import { required, maxLength } from '../common/utils/validation';

const maxLengthValue = maxLength(10);
const TextArea = SelectField("textarea");


const Dialogs = (props) => {

    const dialogElement = props.dialogs.map((d) => {
        return (
            <>
                <Avatar  size={60} icon={<UserOutlined />} />
                <DialogItem id={d.id} name={d.name} />
            </>
        )   
    });

    const messageElement = props.messages.map((m) => {
        return (
            <Message id={m.id} text={m.message} />
        )   
    });

    const addMessage = (formData) => {
        props.addMessage(formData.message);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                {messageElement}
                <AddMessageReduxForm onSubmit={addMessage} />
                
            </div>
            
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  name="message"
                        component={TextArea}
                        validate={[required, maxLengthValue]}
                />
            </div>
            <div>
                <button>Опублікувати</button>
            </div>
        </form>
    )
}

let AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;