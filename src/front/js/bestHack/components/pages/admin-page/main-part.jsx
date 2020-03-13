import React from 'react';
import { connect } from 'react-redux';

import UserHeader from './chosen-user/user-header.jsx';
import UserAlgMenu from './chosen-user/user-alg-menu.jsx';

class MainPart extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        //console.log(this.props.users);

        const setHead = (props) => {

            let userHeader = (
                <div className="col-9">
                    <div className="main-part">
                        <div className="choose">Выберите пользователя</div>
                    </div>
                </div>
            );
            this.props.users.map((el) => {
                
                if (el.isUserSelected){
                    userHeader = (
                        <div className="col-9">
                            <UserHeader name={el.name} />
                            <div className="main-part">
                                <UserAlgMenu />
                            </div>
                        </div>
                    )
                }

            });
            return userHeader;
        };

        return (
            setHead(this.props)
        )
    }
};

const mapStateToProps = state => {
    
    return {
        users: state.users
    }
};

export default connect(mapStateToProps)(MainPart);
