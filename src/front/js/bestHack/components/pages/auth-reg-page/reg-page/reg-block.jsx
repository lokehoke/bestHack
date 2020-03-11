'use strict';
import React from 'react';

import Descr from '../descr.jsx';
import Reg from './reg.jsx';

class RegBlock extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className="col-5">
                <div className="auth-block">
                    <Descr />
                    <Reg />
                </div>
            </div>
            
        );
    };
};

export default RegBlock;