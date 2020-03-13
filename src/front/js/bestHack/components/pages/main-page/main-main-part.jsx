import React from 'react';
import { connect } from 'react-redux';
import SelectedMainPart from './selected-main-part.jsx';



class MainMainPart extends React.Component {
    constructor(props) {
        super(props);
    }
  

    render() {
    const openAlg = (props) => {

        let alg =  null;
        this.props.myAlgs.map((el) => {
        console.log(el.isAlgSelected)
            if (el.isAlgSelected) {
                alg = (
                    <div className="menu-part">
                        <SelectedMainPart />
                    </div>
                );
            } 
            else {
                alg = <div className="choose">Выберите алгоритм</div>;
            }

        });
        //console.log('alg: ', alg);
        return alg;
        
        
    }

        return (
            <div className="col-9">
                <div className="main-part">
                <div className="menu-part">
                        <SelectedMainPart />
                    </div>
                </div>
            </div>
        )
    }
};



const mapStateToProps = state => {
    
    return {
        myAlgs: state.myAlgs,
    }
};



export default connect(mapStateToProps)(MainMainPart);