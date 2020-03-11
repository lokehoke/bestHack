import React from 'react';

import User from './user.jsx';
import OpenUser from './chosen-user/open-user.jsx';
import { connect } from 'react-redux';
import { ToggleUserWithble } from '../../../actions/actions.js';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="users-list">
                {this.props.users.map((el, id) => (
                    <div key={id} className="user" onClick={((id) => {return () => (this.props.ToggleUserWithble(id))})(el.id)}>
                        <User  user={el} />
                    </div>
                    )
                )}
                
            </div>
        )
    }

};

const mapStateToProps = state => {
    
    return {
        users: state.users
    }
};

const mapDispatchToProps = dispatch => {
    
    return {
        ToggleUserWithble: (id) => dispatch(ToggleUserWithble(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
//export default UsersList;