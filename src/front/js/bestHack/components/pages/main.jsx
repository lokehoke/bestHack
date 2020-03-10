import React from 'react';

import ImgBlock from './auth-page/img-block.jsx';
import AuthBlock from './auth-page/auth-block.jsx';


class Main extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className="main">
                <ImgBlock />
                <AuthBlock />
            </div>
        );
    };
};




export default Main;