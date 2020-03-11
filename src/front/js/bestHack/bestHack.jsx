'use strict';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

import getReducer from './reducer/reducer.js';
const settings = require('./settings/defaultSettings.json');

import App from './components/app.jsx';


const reducer = getReducer(settings);
const store = createStore(reducer);

class BestHack {
    constructor(selector) {
        this._mountPoint = document.querySelector(selector);
        this._store = store;

        ReactDOM.render(
           <Provider store={this._store}>
                <App />
           </Provider>,
            this._mountPoint
        );
             
    };
}

export default BestHack;