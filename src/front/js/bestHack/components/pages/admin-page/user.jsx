import React from 'react';


class User extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (

                <div className="user-item">
                    <img className="pointer" src="resources/img/pointer.png" alt="efpve"/>
                    <div className="user-title">{this.props.user.name}</div>
                </div>        
        )
    }
};

export default User;