'use strict';
import React from 'react';

import ImgBlock from './img-block.jsx';
import LoginBlock from './login-block.jsx';


const LoginPage = () => {
    return(
        <div className="auth-page">
            <ImgBlock />
            <LoginBlock /> 
        </div>

    );
};

export default LoginPage;