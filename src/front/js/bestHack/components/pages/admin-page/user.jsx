import React from 'react';
import { ToggleUserWithble } from '../../../actions/actions.js';
import { connect } from 'react-redux';

class User extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="user-block">
                <div className="user" onClick={() => {this.props.ToggleUserWithble(this.props.user.id)}}>
                    <div className="user-item">
                        <img className="pointer" src="resources/img/pointer.png" alt="efpve"/>
                        <div className="user-title">{this.props.user.name}</div>
                    </div>    
                </div>
            </div>
           
        //    <div key={id} className="user" onClick={((id) => {return () => (this.props.ToggleUserWithble(id))})(el.id)}>
                        
        //     </div>
                    
        )
    }
};

const mapDispatchToProps = dispath => {
    return {
        ToggleUserWithble: (id) => {dispath(ToggleUserWithble(id))}
    }
} 

export default connect(null, mapDispatchToProps)(User);