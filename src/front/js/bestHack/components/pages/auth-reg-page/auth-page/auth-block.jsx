'use strict';
import React from 'react';

import Descr from '../descr.jsx';
import Auth from './auth.jsx';

class AuthBlock extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className="col-5">
                <div className="auth-block">
                    <Descr />
                    <Auth />
                </div>
            </div>
            
        );
    };
};

export default AuthBlock;