import Dialogs from './dialogs';
import {addMessage} from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { appStateType } from '../../redux/redux-store'
import { dialogsType } from '../../redux/dialogs-reducer'
import { messagesType } from '../../redux/dialogs-reducer'

//type props connect
type MapStatePropsType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
}
////

let mapStateToProps = (state: appStateType): MapStatePropsType => {
    
    return {
        dialogs : state.dialogsPage.dialogs,
        messages : state.dialogsPage.messages,
    }
}

export default compose (connect(mapStateToProps, { addMessage }),withAuthRedirect)(Dialogs)
