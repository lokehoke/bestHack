import React from 'react';


class UsersListHeader extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="userlist-header">
                
                <img src="resources/img/sidebar-btn.png" alt="btn" className="sidebar-btn"/>

                <div className="users-form-group form-group">
                        <input type="search" placeholder="Поиск "className="form-control"></input>
                </div>            
                
            </div>
        )
    }
};

export default UsersListHeader;