import React from 'react';
import { connect } from 'react-redux';

import AlgItem from './alg-item.jsx';

class AlgList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (  

            <div className="alg-list">
                {this.props.users.map((el, id) => (
                        <AlgItem  key={id}  user={el} />
                    )
                )}  
            </div>
                                     
        )
    }
};

const mapStateToProps = state => {
    
    return {
        users: state.users
    }
};

export default connect(mapStateToProps)(AlgList);