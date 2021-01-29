import React from 'react';

export default class ProfileStatus extends React.Component {

    state = {
        editMode : false
    }

    activeEditMode = () => {
        this.setState({
            editMode : true
        })
    }

    disabledEditMode = () => {
        this.setState({
            editMode : false
        })
    }
    

    render() {
        return (
            <>
            {!this.state.editMode 
                ?   <div>
                        <span onDoubleClick={ this.activeEditMode }>{this.props.status}</span>
                    </div>
                :    <div>
                        <input autoFocus={true} onBlur={ this.disabledEditMode } value={this.props.status}/>
                    </div>
            }  
            </>
            
        )
    }
}