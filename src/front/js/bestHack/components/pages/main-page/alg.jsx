import React from 'react';
import { openMyAlg } from '../../../actions/actions.js';
import { connect } from 'react-redux';

class Alg extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let selectClass = 'alg';
        if (this.props.alg.isAlgSelected) {
            selectClass += ' select_alg';
        }
        return (
            <div className={selectClass} onClick={() => {this.props.openMyAlg(this.props.alg.id)}}>
                <div className="user-item">
                    <div className="user-title">{this.props.alg.name}</div>
                </div>
            </div>
            
                 
        )
    }
};

const mapStateToProps = state => {
    
    return {
        myAlgs: state.myAlgs,
        isAlgSelected: state.isAlgSelected,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openMyAlg:  (id) => dispatch(openMyAlg(id)),
    }
} 

export default connect(mapStateToProps , mapDispatchToProps)(Alg);
