import React from 'react';

import User from './user.jsx';
import AlgList from './chosen-user/alg-list.jsx';
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
                    <User  key={id}  user={el} />
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



export default connect(mapStateToProps)(UsersList);
