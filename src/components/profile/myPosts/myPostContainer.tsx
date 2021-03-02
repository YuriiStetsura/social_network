//import s from './myPost.module.css';

import { actions, postsType } from '../../../redux/profile-reducer';
import MyPost from './myPost';
import {connect} from 'react-redux';
import { appStateType } from '../../../redux/redux-store';

type MapStateToPropsType = {
    posts: Array<postsType>
}

let mapStateToProps = (state: appStateType): MapStateToPropsType => {
    return {
        posts : state.profilePage.posts
    }
}

const MyPostContainer = connect(mapStateToProps, {addPost: actions.addPost})(MyPost);

export default MyPostContainer;