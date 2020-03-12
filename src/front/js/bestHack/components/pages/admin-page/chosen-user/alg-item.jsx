import React from 'react';

class AlgItem extends React.Component{
    constructor(props) {
        super(props);
    }
s
    render() {
        return(
            <div className="alg-item">
                <img className="alg-img" src="resources/img/alg.png" alt="sadvsd"/>
                <div className="users-alg">{this.props.user.algs.name}</div>
            </div> 
        )
    }
}

export default AlgItem;