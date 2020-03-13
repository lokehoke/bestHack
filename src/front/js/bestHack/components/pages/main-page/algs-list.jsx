import React from 'react';

import Alg from './alg.jsx';
import { connect } from 'react-redux';


class AlgsList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
       
        return (  
            <div className="algs">
                <div className="user">
                    <div className="new-alg-btn-title">+ Новый алгоритм</div>
                </div>
                <div className="list">
                    <div className="users-list">
                        
                            {this.props.myAlgs.map((el, id) => (
                                    <Alg  key={id}  alg={el} />
                                )
                            )}
                        
                    
                    </div>
                </div>    
            
            </div>
           
        )
    }

};

const mapStateToProps = state => {
    
    return {
        myAlgs: state.myAlgs
    }
};



export default connect(mapStateToProps)(AlgsList);