'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { closeBlocker } from '../actions/actions.js';

import Main from './pages/main.jsx';



class App extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        console.log(this.props);
        let blockerClass = "blocker",
            blockerOpClass = "blocker-opacity";
        if (this.props.blokerIsActive) {
            blockerClass += " active";
            blockerOpClass += " active";
        }

        return (
            <div className="app">
                <div className={blockerClass}>
                <div className={blockerOpClass} onClick={this.props.closeBlocker}></div>
                    <div className="blocker-side col-9">
                        <div className="blocker-alert">

                            <div className="alert-block">
                                <div className="blocker-title">Заблокировать пользователя </div>
                            
                                <div className="blocked-user"> {this.props.selectUser}? </div>
                                
                                <div className="blocker-buttons">
                                    <button className="btn-1 blocker-btn">Нет</button>
                                    <button className="blocker-btn">Да</button>
                                </div>
                            </div>

                            
                        
                        </div>
                    </div>
                </div>                
                <Main serverFetch={this.props.serverFetch} />
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        blokerIsActive: state.blokerIsActive,
        selectUser: state.selectUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        closeBlocker: () => dispatch(closeBlocker())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);