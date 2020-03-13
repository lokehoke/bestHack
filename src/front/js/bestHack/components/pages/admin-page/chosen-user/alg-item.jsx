import React from 'react';
import { ToggleAlgWithble } from '../../../../actions/actions.js';
import { connect } from 'react-redux';
class AlgItem extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        
        let itemClass = "alg-item";

        if (this.props.isAlgSelected) {
            itemClass = "alg-item select-alg-item";
        }
        
        //console.log(this.props.isAlgSelected);

        return(
            <div className={itemClass}  onClick={() => {this.props.ToggleAlgWithble(this.props.id)}}>
                <div className="alg-border">
                    <img className="alg-img" src="resources/img/alg.png" alt="sadvsd"/>
                    <div className="users-alg">{this.props.name}</div>
                </div>
                
            </div> 
        )
    }
}


const mapStateToProps = state => {
    
    return {
       users: state.users
    }
};

const mapDispatchToProps = dispath => {
    return {
        ToggleAlgWithble: (id) => {dispath(ToggleAlgWithble(id))}
    }
} 

export default connect( mapStateToProps, mapDispatchToProps)(AlgItem);

