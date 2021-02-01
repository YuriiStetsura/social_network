import Dialogs from './dialogs';
import s from './dialogs.module.css';

import {addMessage} from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';



let mapStateToProps = (state) => {
    
    return {
        dialogs : state.dialogsPage.dialogs,
        messages : state.dialogsPage.messages,
    }
}

export default compose (connect(mapStateToProps, { addMessage }),withAuthRedirect)(Dialogs)
