import React from 'react';
import { WrappedFieldProps } from 'redux-form';

type FormsControlsPropsType = {
    meta: {
        touched: boolean
        error: string
    }
    input: any
}

export const SelectField = (Component: React.FC | string ): React.FC<FormsControlsPropsType> => ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;

    return (
        <div >
            <div>
                <Component {...input} {...props} className={!touched 
                                                                ? "form-control" : hasError 
                                                                ? "form-control is-invalid" : "form-control is-valid"}/>    
            </div>
            { hasError && error && 
                <div className="alert alert-danger" role="alert">
                    {error}
                </div> 
            }
        </div>
    )
 }

 