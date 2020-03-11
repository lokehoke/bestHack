import React from 'react';


class User extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (

            <ul className="user-item list-group list-group-flush">
                <li className="list-group-item">
                    <img className="pointer" src="resources/img/pointer.png" alt="efpve"/>
                    <div className="user-title">Biba Boba</div>
                </li>
            </ul>

        )
    }
};

export default User;