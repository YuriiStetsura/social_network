import React from 'react';
//import s from './post.module.css';

type PropsType = {
    post: string
    likeCount: number
}
const Post: React.FC<PropsType> = (props) => {
    
    return (
        <>
            {props.post}  {props.likeCount}
        </>
    )
}

export default Post;