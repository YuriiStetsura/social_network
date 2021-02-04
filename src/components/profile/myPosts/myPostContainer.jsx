//import s from './myPost.module.css';

import { addPost } from '../../../redux/profile-reducer';
import MyPost from './myPost';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {
    
    return {
        posts : state.profilePage.posts,
    }
}

const MyPostContainer = connect(mapStateToProps, { addPost })(MyPost);

export default MyPostContainer;