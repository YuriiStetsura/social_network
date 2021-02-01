import React from 'react';
//import s from './myPost.module.css';
import Post from './post/post'
import { Field, reduxForm } from 'redux-form';
import { Button } from 'antd';
import { required, maxLength } from '../../common/utils/validation';
import { SelectField } from '../../common/FormsControls/FormsControls';

const maxLengthValue = maxLength(50);
const TextArea = SelectField("textarea");

const MyPost = (props) => {

    const postElement = props.posts.map(p => <Post post={p.post} likeCount={p.likeCount} /> );


    let onAddPost = (formData) => {
        props.addPost(formData.post);
    }

    return (
        <div>
            <h3>My Posts</h3>
            <div>
                New Posts
                <div>
                    <AddPostReduxForm onSubmit={onAddPost} />    
                </div>
            </div>
            <div>
                {postElement}
            </div>
        </div>
    )
}

const addPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  name="post" 
                        placeholder="Post message"
                        component={TextArea}
                        validate={[required, maxLengthValue]}
                />
            </div> 
            <div>
                {/* <button>fewefgwef</button> */}
                <Button type="primary" htmlType="submit" ghost >Опублікувати</Button>
            </div>
        </form>
    )
}

let AddPostReduxForm = reduxForm({form: "PostForm"})(addPostForm);


export default MyPost;