import React from 'react';
//import s from './post.module.css';

const Post = (props) => {
    return (
        <div>
            {props.post}  {props.likeCount}
        </div>
    )
}

export default Post;