import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Button } from 'antd';
import s from './profileInfo.module.css';
import { required } from '../../common/utils/validation';
import { SelectField } from '../../common/FormsControls/FormsControls';
import { contactsType, profileUserType } from '../../../redux/profile-reducer'
import { ProfileInfoFormDataType } from './profileInfo'

const textarea = SelectField("textarea");
const input = SelectField("input");

// type PropsOwnType = {
//   contacts: contactsType 
//   initialValues: profileUserType 
// }

let FormProfileInfoData = (props) => {

    const contacts = Object.entries(props.contacts);

    return (
        <form onSubmit={props.handleSubmit}>
        <div>
          <label>Full name:</label>
          <Field name="fullName" component={input} type="text" validate={required}/>
        </div>
        <div>
          <label>About me: </label>
          <Field name="aboutMe" component={input} type="text" validate={required}/>
        </div>
        <div>
          <label>Soft skills:</label>
          <Field name="lookingForAJobDescription" component={textarea} type="text" validate={required}/>
        </div>
        <div>
          <label>Looking for a job:</label>
          <Field name="lookingForAJob" component={input} type="checkbox"/>
        </div>
        <div>
            <b>Contacts: </b>
            <div>
                {contacts.map(elem => {
                    return  <div key={elem[0]} className={s.contact}>
                                <label>{elem[0]}</label> : <div className={s.contact}><Field className="form-control" name={`contacts.${elem[0]}`} component="input" type="text"/></div>
                            </div>
                })}
            </div>
        </div>
        {props.error ? <div className="alert alert-danger" role="alert">{props.error}</div> : undefined}
        <Button type="primary" htmlType="submit" ghost>Save</Button>
      </form>
    )
}

FormProfileInfoData = reduxForm({form: 'profileInfo'})(FormProfileInfoData);


export default FormProfileInfoData;