'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from "react-router";

import LoginPage from './login-page/login-page.jsx';
import AdminPage from './admin-page/admin-page.jsx';
import MainPage from './main-page/main-page.jsx';


class Main extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
         if (this.props.currentPath === '/auth' || this.props.currentPath === '/register') {
            return (
                <div className="main">
                    <LoginPage serverFetch={this.props.serverFetch} />    
                </div>
            );
         } else if (this.props.currentPath === '/admin') {
            return (
                <div className="main">
                    <AdminPage serverFetch={this.props.serverFetch} />    
                </div>
            );
         } else if (this.props.currentPath === '/main') {
            return (
                <div className="main">
                    <MainPage serverFetch={this.props.serverFetch} />    
                </div>
            );
         };



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