import React from 'react';
//import s from './myPost.module.css';

import { Input } from 'antd';

import Post from './post/post'
import { Button } from 'antd';


const { TextArea } = Input;

const MyPost = (props) => {
    const postElement = props.posts.map(p => <Post post={p.post} likeCount={p.likeCount} /> );

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
        props.updateNewPostText('');
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div>
            <h3>My Posts</h3>
            <div>
                New Posts
                <div>
                    <textarea onChange={onPostChange} 
                              value={props.newPostText}
                              ref={newPostElement}>
                    </textarea>
                    {/* <button onClick={ addPost }>dcw</button> */}
                    {/* <TextArea ref={newPostElement} showCount maxLength={100} /> */}
                    <div>
                        <Button type="primary" ghost onClick={ addPost }>Опублікувати</Button>
                    </div>  
                </div>
            </div>
            <div>
                {postElement}
            </div>
        </div>
    )
}

export default MyPost;