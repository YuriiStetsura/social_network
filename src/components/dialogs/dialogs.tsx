import React from 'react';
import DialogItem from './dialogItem/dialogItem';
import s from './dialogs.module.css';
import Message from './messageItem/messageItem';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { SelectField } from '../common/FormsControls/FormsControls';
import { required, maxLength } from '../common/utils/validation';
import {dialogsType, messagesType} from '../../redux/dialogs-reducer'

const maxLengthValue = maxLength(10);
const TextArea = SelectField("textarea");

// type props Dialogs
type DialogsPropsType = {
    dialogs: Array<dialogsType> 
    messages: Array<messagesType>
    addMessage: (message: string) => void
}
type MessageFormDataType = {
    message: string
}
////

const Dialogs: React.FC<DialogsPropsType> = ({dialogs, messages, addMessage}) => {

    const dialogElement = dialogs.map((d) => {
        return (
            <div key={d.id}>
                <Avatar  size={60} icon={<UserOutlined />} />
                <DialogItem  id={d.id} name={d.name} />
            </div>
        )   
    });

    const messageElement = messages.map((m) => {
        return (
            <Message key={m.id} id={m.id} text={m.message} />
        )   
    });

    const onAddMessage = (formData: MessageFormDataType) => {
        const message = formData.message;
        addMessage(message);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                {messageElement}
                <AddMessageReduxForm onSubmit={onAddMessage} />
                
            </div>
            
        </div>
    )
}

const AddMessageForm: React.FC<InjectedFormProps<MessageFormDataType>> = (props) => {
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

let AddMessageReduxForm = reduxForm<MessageFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;