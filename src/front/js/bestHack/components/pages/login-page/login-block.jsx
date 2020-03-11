'use strict';
import React from 'react';
import { connect } from 'react-redux';

import Descr from './descr.jsx';
import Auth from './auth.jsx';
import Reg from './reg.jsx';

class LoginBlock extends React.Component {
    constructor(props){
        super(props);
    };

    render() {

        switch(this.props.currentPath) {
            case '/auth':
                return(
                    <div className="col-5">
                        <div className="auth-block">
                            <Descr />
                            <Auth />
                        </div>
                    </div>
                );
            case '/register':
                return (
                    <div className="col-5">
                        <div className="auth-block">
                            <Descr />
                            <Reg />
                        </div>
                    </div>
                )
        };
    };
};

const mapStateToProps = (state) =>  {
    return {                         
        currentPath: state.currentPath
    };
};

export default connect(mapStateToProps)(LoginBlock);