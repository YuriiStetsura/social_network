// import React from 'react';

// export default class ProfileStatus extends React.Component {
    
//     state = {
//         editMode : false,
//         status : this.props.status
//     }

//     activeEditMode = () => {
//         this.setState({
//             editMode : true
//         })
//     }

//     disabledEditMode = () => {
//         this.setState({
//             editMode : false
//         });
//         this.props.updateStatusUserThunk(this.state.status);
//     }

//     onStatusChange = (e) => {
//         this.setState({
//             status : e.currentTarget.value
//         })
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.status !== this.props.status) {
//             this.setState({
//                 status : this.props.status
//             });
//         }
//     }
    

//     render() {
//         return (
//             <>
//             {!this.state.editMode 
//                 ?   <div>
//                         <span onDoubleClick={ this.activeEditMode }>{ this.props.status || "No Status" }</span>
//                     </div>
//                 :    <div>
//                         <input autoFocus={true} 
//                                onChange={this.onStatusChange}
//                                onBlur={ this.disabledEditMode } 
//                                value={ this.state.status }
//                         />
//                     </div>
//             }  
//             </>
            
//         )
//     }
// }