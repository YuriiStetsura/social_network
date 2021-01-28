//import s from './myPost.module.css';

import { updateNewPostMessageActionCreator, addPostActionCreator } from '../../../redux/profile-reducer';
import MyPost from './myPost';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {
    
    return {
        posts : state.profilePage.posts,
        newPostText : state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText : (text) => {
            dispatch(updateNewPostMessageActionCreator(text))
        },
        addPost : () => {
            dispatch(addPostActionCreator());
            dispatch(updateNewPostMessageActionCreator(''));
        }
    }
}

const myPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default myPostContainer;