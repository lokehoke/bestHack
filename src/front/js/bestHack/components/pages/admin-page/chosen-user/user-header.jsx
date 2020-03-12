import React from 'react';

class UserHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="user-header">
                <div className="header-el">
                    <img className="block-img" src="resources/img/block.png" alt="block"/>
                    <div className="title"> {this.props.name} </div>
                    <div className="access-right">Пользователь</div>
                </div>
               
            </div>
        )
    }
};


export default UserHeader;