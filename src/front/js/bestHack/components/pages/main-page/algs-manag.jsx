import React from 'react';

import UsersListHeader from '../admin-page/userlist-header.jsx';
import AlgsList from './algs-list.jsx';

class AlgsManag extends React.Component {
    constructor(props) {
        super(props);
    };

    render(){
        return (
            <div className="col-3">
                <div className="users-manag">
                    <UsersListHeader />
                    <AlgsList />
                </div>
            </div>
            
        )
    }
};

export default AlgsManag;