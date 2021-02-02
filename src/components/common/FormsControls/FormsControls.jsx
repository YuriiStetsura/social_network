import React from 'react';
import styles from './FormsControls.module.css';


export const SelectField = (Component) => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        // className={styles.formControl + " " + (hasError ? styles.error : "")}
        <div >
            <div>
                <Component {...input} {...props} className={!meta.touched 
                                                                ? "form-control" : hasError 
                                                                ? "form-control is-invalid" : "form-control is-valid"}/>    
            </div>
            { hasError && meta.error && 
                <div class="alert alert-danger" role="alert">
                    {meta.error}
                </div> 
            }
        </div>
    )
 }

 