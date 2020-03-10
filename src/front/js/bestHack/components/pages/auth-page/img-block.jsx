import React from 'react';


class ImgBlock extends React.Component {
    constructor(props){
        super(props);
    };

    render(){
        return (
            <div className="img-block col-7">
                <img src="resources/img/logo.png" alt="logo" className="logo"></img> 
                <img src="resources/img/comp.png" alt="logo" className="comp"></img>    
            </div>
        );
    };
};



export  default ImgBlock;