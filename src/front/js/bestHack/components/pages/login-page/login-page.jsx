'use strict';
import React from 'react';

import ImgBlock from './img-block.jsx';
import LoginBlock from './login-block.jsx';


const LoginPage = (props) => {
    return(
        <div className="auth-page">
            <ImgBlock />
            <LoginBlock serverFetch={props.serverFetch} /> 
        </div>

    );
};

export default LoginPage;