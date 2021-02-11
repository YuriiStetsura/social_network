import React from 'react';
//import s from './post.module.css';

const Post = (props) => {
    return (
        <>
            {props.post}  {props.likeCount}
        </>
    )
}

export default Post;