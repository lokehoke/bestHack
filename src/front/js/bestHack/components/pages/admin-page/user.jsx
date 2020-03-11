import React from 'react';


class User extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="user">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <img src="resources/img/pointer.png" alt="efpve"/>
                        <div className="user-title">User1</div>
                    </li>
                </ul>
            </div>
        )
    }
};

export default User;