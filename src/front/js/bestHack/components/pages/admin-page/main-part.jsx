import React from 'react';
import { connect } from 'react-redux';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

import UserHeader from './chosen-user/user-header.jsx';

function onChange(newValue) {
    console.log("change", newValue);
}  

class MainPart extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        //console.log(this.props.users);
        let code = '';
        let header = ((props) => {

            let userHeader = null;
            this.props.users.map((el) => {
                
                if (el.isUserSelected){
                    userHeader = (<UserHeader name={el.name} />);

                    el.algs.forEach((alg) => {
                        
                        if (alg.isAlgSelected) {
                            console.log(alg);
                            code = alg.code;
                            console.log(code);
                        }
                    });

                    console.log(code)
                }

            });
            return userHeader;
        })(this.props);


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
        )
    }
};

const mapStateToProps = state => {
    
    return {
        users: state.users,
        isAlgSelected: state.isAlgSelected,
    }
};

export default connect(mapStateToProps)(MainPart);
