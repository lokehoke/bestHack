import React from 'react';


class User extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (

            
                <li className="list-group-item">
                    
                    <div className="user-item">
                        <img className="pointer" src="resources/img/pointer.png" alt="efpve"/>
                        <div className="user-title">Biba Boba</div>
                    </div>
                    
                </li>
           

        )
    }
};

export default User;