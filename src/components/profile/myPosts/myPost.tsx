import React from 'react';
//import s from './myPost.module.css';
import Post from './post/post'
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Button } from 'antd';
import { required, maxLength } from '../../common/utils/validation';
import { SelectField } from '../../common/FormsControls/FormsControls';
import { postsType } from '../../../redux/profile-reducer'

const maxLengthValue = maxLength(10);
const TextArea = SelectField("textarea");

type MyPostPropsType = {
    posts: Array<postsType>
    addPost: (post: string) => void
}
type MyPostsFromDataType = {
    post: string
}
const MyPost: React.FC<MyPostPropsType> = React.memo(props => {

    const postElement = props.posts.map(p => <div key={Math.random()}><Post post={p.post} likeCount={p.likeCount} /></div> );

    let onAddPost = (formData: MyPostsFromDataType) => {
        props.addPost(formData.post);
        //console.log(formData.post)
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
});

const addPostForm: React.FC<InjectedFormProps<MyPostsFromDataType>>  = (props) => {

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
                <Button type="primary" htmlType="submit" ghost >Опублікувати</Button>
            </div>
        </form>
    )
}

let AddPostReduxForm = reduxForm<MyPostsFromDataType>({form: "PostForm"})(addPostForm);


export default MyPost;