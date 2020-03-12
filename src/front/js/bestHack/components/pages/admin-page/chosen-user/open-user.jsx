import React from 'react';


class OpenUser extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="user-item">
                <img className="active-pointer" src="resources/img/active-pointer.png" alt="efpve"/>
                <div className="user-title">{this.props.name}</div>
            </div>            
        )
    }
};

export default OpenUser;