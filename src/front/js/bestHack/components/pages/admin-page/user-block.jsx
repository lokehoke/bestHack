import React from 'react';
import { ToggleUserWithble } from '../../../actions/actions.js';
import { connect } from 'react-redux';


import User from './user.jsx';
import OpenUser from './chosen-user/open-user.jsx';
import AlgList from './chosen-user/alg-list.jsx';

class UserBlock extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        // const openClose = (props) => {
        //     if (this.props.user.isClose) {
        //         return (  
        //             <User name={this.props.user.name}/>         
        //         );
        //     } else {
        //         return (
        //             <OpenUser name={this.props.user.name}/>  
        //             <AlgList />     
        //         );
        //     }
        // }
        

        // return (
        //     <div className="user-block">
        //         <div className="user" onClick={() => {this.props.ToggleUserWithble(this.props.user.id)}}>
        //             {openClose(this.props)}  
        //         </div>
        //     </div>
        // );
    
        if (this.props.user.isClose) {
            return (  
                <div className="user-block">
                    <div className="user" onClick={() => {this.props.ToggleUserWithble(this.props.user.id)}}>
                        <User name={this.props.user.name}/>       
                    </div>
                </div>        
            );
        } else {
            return (
                <div className="user-block">
                    <div className="user open-user" onClick={() => {this.props.ToggleUserWithble(this.props.user.id)}}>
                        <OpenUser name={this.props.user.name} />          
                    </div>
                    <AlgList  algs={this.props.user.algs}/> 
                </div>  
                   
            );
        }
    
    
    }
};

const mapStateToProps = state => {
    
    return {
        users: state.users
    }
};


const mapDispatchToProps = dispath => {
    return {
        ToggleUserWithble: (id) => {dispath(ToggleUserWithble(id))}
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);