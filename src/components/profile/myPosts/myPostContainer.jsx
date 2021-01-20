import React from 'react';
//import s from './myPost.module.css';

import { updateNewPostMessageActionCreator, addPostActionCreator } from '../../../redux/profile-reducer';
import MyPost from './myPost';


const myPostContainer = (props) => {
    let state = props.store.getState().profilePage;

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
        props.store.dispatch(updateNewPostMessageActionCreator(''));
    }

    let onPostChange = (text) => {
        props.store.dispatch(updateNewPostMessageActionCreator(text));
    }

    return (
        <MyPost updateNewPostText={onPostChange} addPost={addPost} posts={state.posts} newPostText={state.newPostText}/>
    )
}

export default myPostContainer;