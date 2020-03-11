import React from 'react';


class OpenUser extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="user">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                       
                        <img src="resources/img/active-pointer.png" alt="efpve"/>
                        <div className="user-title">Biba Boba</div>
                       
                        <li class="list-group-item">
                            <div className="users-alg">Nice cock prodaction</div>
                        </li>

                    </li>
                </ul>
            </div>
        )
    }
};

export default OpenUser;