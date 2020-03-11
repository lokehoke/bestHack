import React from 'react';

import UsersListHeader from './userlist-header.jsx';
import UsersList from './users-list.jsx';

class UsersManag extends React.Component {
    constructor(props) {
        super(props);
    };

    render(){
        return (
            <div className="col-3">
                <div className="users-manag">
                    <UsersListHeader />
                    <UsersList />
                </div>
            </div>
            
        )
    }
};

export default UsersManag;