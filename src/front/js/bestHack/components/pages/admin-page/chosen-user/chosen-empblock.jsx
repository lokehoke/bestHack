import React from 'react';

import UserHeader from './user-header.jsx';

class ChosenEmptyBlock extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="col-9">
                
                <UserHeader />
                <div className="main-part">
                    <div className="choose">Выберите алгоритм</div>
                </div>
                
            </div>
        )
    }
};

export default ChosenEmptyBlock;