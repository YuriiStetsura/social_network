import React from 'react'
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';

type PropsType = {
    getUserThunk: (currentPage: number, pageSize: number, term: string | null, friend: boolean | null) => void
}

const SearchUsers: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    
    return (
        <div>
            <h2>Search</h2>
            <Formik
                initialValues={{
                    term: '', friend: null
                }}
                onSubmit={async (values) => {
                    dispatch(props.getUserThunk(1, 5, values.term, values.friend))
                }}
            >
                <Form>
                    <label htmlFor="term">User Name:</label>
                    <Field id="term" name="term" placeholder="input user name" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Follow friend</option>
                        <option value="false">Unfollow friend</option>
                    </Field>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SearchUsers