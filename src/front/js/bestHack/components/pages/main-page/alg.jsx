import React from 'react';


class Alg extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
 
        return (
            <div className="user">
                <div className="user-item">
                    <div className="user-title">{this.props.alg.name}</div>
                </div>  
            </div>
            
                 
        )
    }
};

export default Alg;