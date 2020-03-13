import React from 'react';
import { connect } from 'react-redux';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

import UserHeader from './chosen-user/user-header.jsx';
import UserAlgMenu from './chosen-user/user-alg-menu.jsx';

import { setAllAlgo } from './../../../actions/actions.js';

function onChange(newValue) {
    console.log("change", newValue);
}  

class MainPart extends React.Component {
    constructor(props) {
        super(props);

        this.props.serverFetch.getAllAlgo((algo) => {
            this.props.serverFetch._store.dispatch(setAllAlgo(algo));
        });
    }

    render() {
        let code = '';
        let header = ((props) => {
            let userHeader = null;
            this.props.users.map((el) => {
                if (el.isUserSelected){
                    userHeader = (<UserHeader name={el.name} />);
                    el.algs.forEach((alg) => {
                        if (alg.isAlgSelected) {
                            code = alg.code;
                        }
                    });
                }
            })
        });
        // const setHead = (props) => {
        //     let userHeader = (
        //         <div className="col-9">
        //             <div className="main-part">
        //                 <div className="choose">Выберите пользователя</div>
        //             </div>
        //         </div>
        //     );
        //     this.props.users.map((el) => {
                
        //         if (el.isUserSelected){
        //             userHeader = (
        //                 <div className="col-9">
        //                     <UserHeader name={el.name} />
        //                     <div className="main-part">
        //                         <UserAlgMenu />
        //                     </div>
        //                 </div>
        //             )
        //         }

        //     });
        //     return userHeader;
        // })(this.props);


        let codeEditor = null;
        if (this.props.isAlgSelected) {
            codeEditor = (<AceEditor
                placeholder="code"
                mode="java"
                theme="monokai"
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={16}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
                }}/>);
        } else {
            codeEditor = (<div className="choose">Выберите пользователя </div>) ;
        }

        return (
            <div className="col-9">
                {header}
                <div className="main-part">
                    {codeEditor}
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    
    return {
        users: state.users,
        isAlgSelected: state.isAlgSelected,
    }
};

export default connect(mapStateToProps)(MainPart);
