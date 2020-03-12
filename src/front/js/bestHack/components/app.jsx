'use strict';
import React from 'react';
import Main from './pages/main.jsx';



class App extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <Main serverFetch={this.props.serverFetch} />
        );
    };
};





export default App;