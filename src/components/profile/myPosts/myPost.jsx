import React from 'react';
//import s from './myPost.module.css';

import { Input } from 'antd';

import Post from './post/post'
import { Button } from 'antd';

const { TextArea } = Input;

const MyPost = () => {

    const posts = [
        { id: "1", post: "Yura", likeCount: "5" },
        { id: "2", post: "Bohdan", likeCount: "10" },
        { id: "3", post: "Ihor", likeCount: "25" },
        { id: "4", post: "Alex", likeCount: "7" }
    ];

    const postElement = posts.map(p => <Post post={p.post} likeCount={p.likeCount} />)

    return (
        <div>
            <h3>My Posts</h3>
            <div>
                New Posts
                <TextArea showCount maxLength={100} />
                <Button type="primary" ghost>Опублікувати</Button>
            </div>
            <div>
                {postElement}
            </div>
        </div>
    )
}

export default MyPost;