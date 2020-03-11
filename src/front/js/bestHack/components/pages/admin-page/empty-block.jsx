import React from 'react';

class EmptyBlock extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="col-9">
                <div className="main-part">
                    <div className="choose">Выберите алгоритм</div>
                </div>
            </div>
        )
    }
};

export default EmptyBlock;