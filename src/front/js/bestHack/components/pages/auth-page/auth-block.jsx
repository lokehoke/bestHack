import React from 'react';

import Descr from './descr.jsx';
import Auth from './auth.jsx';

class AuthBlock extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className="auth-block col-5">
                <Descr />
                <Auth />
            </div>
            
        )
    }
};

export default AuthBlock;