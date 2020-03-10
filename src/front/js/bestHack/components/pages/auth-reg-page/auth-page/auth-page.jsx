'use strict';
import React from 'react';

import ImgBlock from '../img-block.jsx';
import AuthBlock from './auth-block.jsx';


const AuthPage = () => {
    return(
        <div className="auth-page">
            <ImgBlock />
            <AuthBlock /> 
        </div>

    )
}

export default AuthPage;