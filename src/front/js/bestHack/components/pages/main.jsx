'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from "react-router";

import LoginPage from './login-page/login-page.jsx';
import AdminPage from './admin-page/admin-page.jsx';


class Main extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
         if (this.props.currentPath === '/auth' || this.props.currentPath === '/register') {
            return (
                <div className="main">
                    <LoginPage />    
                </div>
            );
         } else if (this.props.currentPath === '/admin') {
            return (
                <div className="main">
                    <AdminPage />    
                </div>
            );
         }



        return (
            <div className="main">
                <LoginPage />    
            </div>
        );
    };
};


const mapStateToProps = (state) =>  {
    return {                         
        currentPath: state.currentPath,
    };
};

export default connect(mapStateToProps)(Main);