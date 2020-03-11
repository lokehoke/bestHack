import React from 'react';


class AlgList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (  

            // <div className="user-block">
            //     <div className="user">

            //             <div className="user-item">
            //                 <img className="active-pointer" src="resources/img/active-pointer.png" alt="efpve"/>
            //                 <div className="user-title">Biba Boba</div>
            //             </div>  

            //     </div>

                    <div className="alg-list">

                                <div className="alg-item">
                                    <img className="alg-img" src="resources/img/alg.png" alt="sadvsd"/>
                                    <div className="users-alg">Nice cock prodaction</div>
                                </div>
                           
                                <div className="alg-item">
                                    <img className="alg-img"  src="resources/img/alg.png" alt="sadvsd"/>
                                    <div className="users-alg">Awsome eggs industry</div>
                                </div>
                         
                    </div>
            // </div>
                

                
                          
        )
    }
};

export default AlgList;