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
                <MainPart serverFetch={this.props.serverFetch} />
                {/* {this.props.users.map((el, id) => (
                        <MainPart  key={id}  algs={el.algs}  />
                    )
                )} */}

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
