import React from 'react';




class SelectedMainPart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <div className="alg-menu">
                <div className="menu-buttons">
                    <button className="menu-btn menu-btn-1 ">Запуск</button>
                    <div>
                        <button className="menu-btn menu-btn-2">Сохранить</button>
                        <button className="menu-btn menu-btn-3">Удалить</button>
                    </div>
                   
                </div>
            </div>
            
        )
    }
};


export default SelectedMainPart;