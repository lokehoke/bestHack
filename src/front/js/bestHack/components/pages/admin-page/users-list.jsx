import React from 'react';

import UserBlock from './user-block.jsx';
import { connect } from 'react-redux';


class UsersList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
       
        return (
            <div className="list">
                <div className="users-list">
                    {this.props.users.map((el, id) => (
                            <UserBlock  key={id}  user={el} isClose={el.isClose} />
                        )
                    )}
                </div>
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
