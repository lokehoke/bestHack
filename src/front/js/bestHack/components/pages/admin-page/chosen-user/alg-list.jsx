import React from 'react';
import { connect } from 'react-redux';
import AlgItem from './alg-item.jsx';

class AlgList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        
       // console.log(this.props.algs) //[ {}, {}, {} ]

        const list = (props) => {
            
            let algs = this.props.algs.map((el) => ({name: el.name, id: el.id, isAlgSelected: el.isAlgSelected}));//[ {}, {}, {} ]
            //console.log('algs: ', algs);

            return algs.map((el, i) => (<AlgItem  key={i}  name={el.name} id={el.id} isAlgSelected={el.isAlgSelected}/>));
            
        } 

        
        return (  
            <div className="alg-list">
                {list(this.props)}             
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
//export default AlgList;