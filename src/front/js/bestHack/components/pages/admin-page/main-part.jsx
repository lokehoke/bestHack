import React from 'react';
import { connect } from 'react-redux';

import UserHeader from './chosen-user/user-header.jsx';

class MainPart extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        //console.log(this.props.users);

        const setHead = (props) => {

            let userHeader = null;
            this.props.users.map((el) => {
                
                if (el.isUserSelected){
                    userHeader = <UserHeader name={el.name} />;
                }

            });
            return userHeader;
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

const mapStateToProps = state => {
    
    return {
        users: state.users
    }
};

export default connect(mapStateToProps)(MainPart);
