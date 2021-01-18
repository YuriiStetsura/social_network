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
        debugger;
        let text = newPostElement.current.value;
        props.addPost(text);
        newPostElement.current.value = '';
    }

    return (
        <div>
            <h3>My Posts</h3>
            <div>
                New Posts
                <div>
                    <textarea ref={newPostElement}></textarea>
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