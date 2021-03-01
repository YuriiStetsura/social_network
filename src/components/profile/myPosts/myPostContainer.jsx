//import s from './myPost.module.css';

import { actions } from '../../../redux/profile-reducer';
import MyPost from './myPost';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {
    return {
        posts : state.profilePage.posts,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(actions.addPost)
        }
    }
}

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default MyPostContainer;