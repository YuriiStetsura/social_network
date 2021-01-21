import Dialogs from './dialogs';
import s from './dialogs.module.css';

import {updateNewMessageActionCreator, addMessageActionCreator} from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';

// const DialogsContainer = (props) => {
//     let state = props.store.getState().dialogsPage;
    

//     const updateNewPostMessage = (text) => {
//         props.store.dispatch(updateNewMessageActionCreator(text));
//     }

//     const addMessage = () => {
//         props.store.dispatch(addMessageActionCreator());
//         props.store.dispatch(updateNewMessageActionCreator(''));
//     }

//     return (
//        <Dialogs updateNewPostMessage={updateNewPostMessage} 
//                 addMessage={addMessage}
//                 dialogs={state.dialogs}
//                 messages={state.messages}
//                 newPostMessage={state.newPostMessage}/>
//     )
// }

let mapStateToProps = (state) => {
    
    return {
        dialogs : state.dialogsPage.dialogs,
        messages : state.dialogsPage.messages,
        newPostMessage : state.dialogsPage.newPostMessage
    }
}

let mapDispatchToProps = (dispatch) => {
    
    return {
        updateNewPostMessage : (text) => {
            dispatch(updateNewMessageActionCreator(text));
        },
        addMessage : () => {
            dispatch(addMessageActionCreator());
            dispatch(updateNewMessageActionCreator(''));
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;