import React from 'react';


import AlgsManag from './algs-manag.jsx';
import MainMainPart from './main-main-part.jsx';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return(
            <div className="admin-page">
                <AlgsManag />
                <MainMainPart serverFetch={this.props.serverFetch} />
            </div>   
        );
    };
};



export default MainPage;
