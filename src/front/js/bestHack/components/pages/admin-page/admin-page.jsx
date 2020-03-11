import React from 'react';

import UsersManag from './users-manag.jsx';
import EmptyBlock from './empty-block.jsx';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="admin-page">
                <UsersManag />
                <EmptyBlock />
            </div> 
        );
    };
};

export default AdminPage;