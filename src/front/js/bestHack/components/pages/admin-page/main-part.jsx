import React from 'react';

import UserHeader from './chosen-user/user-header.jsx';

class MainPart extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        const setHead = (props) => {
            if (!this.props.user.isClose){
                return (<UserHeader name={this.props.user.name}/>);
            } else {
                return null;
            }
        };

        return (
            <div className="col-9">
                {setHead(this.props)}
                <div className="main-part">
                    <div className="choose">Выберите пользователя</div>
                </div>
            </div>
        )
    }
};

export default MainPart;