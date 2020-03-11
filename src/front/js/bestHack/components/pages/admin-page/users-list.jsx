import React from 'react';

import User from './user.jsx';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="users-list">
                <div className="user">
                    <User />
                    <User />
                </div>
            </div>
        )
    }

};

export default UsersList;