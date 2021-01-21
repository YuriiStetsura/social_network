//import s from './myPost.module.css';

import { updateNewPostMessageActionCreator, addPostActionCreator } from '../../../redux/profile-reducer';
import MyPost from './myPost';
import {connect} from 'react-redux';


// const myPostContainer = (props) => {
//     let state = props.store.getState().profilePage;

//     let addPost = () => {
//         props.store.dispatch(addPostActionCreator());
//         props.store.dispatch(updateNewPostMessageActionCreator(''));
//     }

//     let onPostChange = (text) => {
//         props.store.dispatch(updateNewPostMessageActionCreator(text));
//     }

//     return (
//         <MyPost updateNewPostText={onPostChange} addPost={addPost} posts={state.posts} newPostText={state.newPostText}/>
//     )
// }

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