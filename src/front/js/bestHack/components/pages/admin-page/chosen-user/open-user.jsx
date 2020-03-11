import React from 'react';


class OpenUser extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (  
                <div>

                    <li className="list-group-item">

                        <div className="user-item">
                            <img className="active-pointer" src="resources/img/active-pointer.png" alt="efpve"/>
                            <div className="user-title">Biba Boba</div>
                        </div>  

                    </li>   

                    <div className="alg-list">
                        
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">

                                <div className="user-item">
                                    <img className="alg-img" src="resources/img/alg.png" alt="sadvsd"/>
                                    <div className="users-alg">Nice cock prodaction</div>
                                </div>
                                
                            </li>
                            
                            <li className="list-group-item">
                                <div className="user-item">
                                    <img className="alg-img"  src="resources/img/alg.png" alt="sadvsd"/>
                                    <div className="users-alg">Awsome eggs industry</div>
                                </div>
                            </li>
                        </ul>

                    </div>

                </div>
                          
        )
    }
};

export default OpenUser;