import Dialogs from './dialogs';
import s from './dialogs.module.css';

import {updateNewMessage, addMessage} from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';



let mapStateToProps = (state) => {
    
    return {
        dialogs : state.dialogsPage.dialogs,
        messages : state.dialogsPage.messages,
        newPostMessage : state.dialogsPage.newPostMessage,
    }
}

export default compose (connect(mapStateToProps, { updateNewMessage, addMessage }),withAuthRedirect)(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, { updateNewMessage, addMessage })(AuthRedirectComponent);

// export default DialogsContainer;