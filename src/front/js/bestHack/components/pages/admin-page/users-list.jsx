import React from 'react';

import User from './user.jsx';
import OpenUser from './chosen-user/open-user.jsx';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="users-list">
                <div className="user">
                    <ul className="list-group list-group-flush">
                        <OpenUser />
                        <User />
                    </ul>
                </div>
            </div>
        )
    }

};

export default UsersList;