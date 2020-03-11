import React from 'react';

class EmptyBlock extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="col-9">
                
                    <div className="choose">Выберите пользователя</div>
                
            </div>
        )
    }
};

export default EmptyBlock;