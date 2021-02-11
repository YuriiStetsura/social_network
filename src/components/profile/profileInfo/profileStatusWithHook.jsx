import React, { useEffect, useState } from 'react';

const ProfileStatusWithHook = (props) => {

        let [editMode, setEditMode] = useState(false);
        let [status, setStatus] = useState(props.status);

        const activeEditMode = () => {
            setEditMode(true);
        }

        const disabledEditMode = () => {
            setEditMode(false);
            props.updateStatusUserThunk(status);
        }

        useEffect(() => setStatus(props.status), [props.status]);

        const onStatusChange = (e) => {
            setStatus(e.currentTarget.value);
        }

        return (
            <>
            {!editMode 
                ?   
                    <span onDoubleClick={ activeEditMode }>{ status || "No Status" }</span>
                    
                :    
                    <input autoFocus={true} 
                            onChange={ onStatusChange }
                            onBlur={ disabledEditMode } 
                            value={ status }
                    />
                    
            }  
            </>
            
        )
    
}

export default ProfileStatusWithHook;