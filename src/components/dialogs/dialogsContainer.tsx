import Dialogs from './dialogs';
import {actions, ActionsType} from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { appStateType } from '../../redux/redux-store'
import { dialogsType, messagesType } from '../../redux/dialogs-reducer'
import { Dispatch } from 'react';

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

const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: (message: string) => {
            dispatch(actions.addMessage)
        }
    }
}

export default compose (connect(mapStateToProps, mapDispatchToProps),withAuthRedirect)(Dialogs)

type DispatchType = Dispatch<ActionsType>