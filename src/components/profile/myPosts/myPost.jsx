import React from 'react';
//import s from './myPost.module.css';

import { Input } from 'antd';

import Post from './post/post'
import { Button } from 'antd';

const { TextArea } = Input;

const MyPost = () => {
    return (
        <div>
            <h3>My Posts</h3>
            <div>
                New Posts
                <TextArea showCount maxLength={100} />
                <Button type="primary" ghost>Опублікувати</Button>
            </div>
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default MyPost;