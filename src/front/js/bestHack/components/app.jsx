'use strict';
import React from 'react';
import Main from './pages/main.jsx';



class App extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className="app">
                <div className="blocker">
                    <div className="col-9">

                    </div>
                </div>
                <Main  serverFetch={this.props.serverFetch}/>
            </div>
        );
    };
};





export default App;
