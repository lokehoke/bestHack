import React from 'react';
import { connect } from 'react-redux';

import UsersManag from './users-manag.jsx';
import MainPart from './main-part.jsx';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="admin-page">
                <UsersManag />
                {this.props.users.map((el, id) => ( <MainPart  key={id}  user={el} isClose={el.isClose}/>))}   
                
            </div>   
        );
    };
};


const mapStateToProps = state => {
    
    return {
        users: state.users
    }
};

export default connect(mapStateToProps)(AdminPage);
