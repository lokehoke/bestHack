import React from 'react';
import { openBlocker } from '../../../../actions/actions.js';
import { connect } from 'react-redux';

class UserHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
    
            <div className="user-header">
                <div className="header-el">
                    <img className="block-img" src="resources/img/block.png" alt="block" onClick={this.props.openBlocker}/>
                    <div className="title"> {this.props.name} </div>
                    <div className="access-right">Пользователь</div>
                </div>
               
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openBlocker: () => dispatch(openBlocker())
    };
};

export default connect(null, mapDispatchToProps)(UserHeader);