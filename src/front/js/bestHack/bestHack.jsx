'use strict';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

import getReducer from './reducer/reducer.js';
const settings = require('./settings/defaultSettings.json');

import App from './components/app.jsx';
import ServerFetch from './ajax/serverFetch.js';


const reducer     = getReducer(settings);
const store       = createStore(reducer);
const serverFetch = new ServerFetch(store);

class BestHack {
    constructor(selector) {
        this._mountPoint = document.querySelector(selector);
        this._store = store;
        this._serverFetch = null;

        ReactDOM.render(
           <Provider store={this._store}>
                <App serverFetch={this._serverFetch}/>
           </Provider>,
            this._mountPoint
        );

        document.addEventListener('selectstart', e => {
            e.preventDefault();
            return false;
        });

        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        });
             
    };
}

export default BestHack;