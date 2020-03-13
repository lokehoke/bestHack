import React from 'react';
import { connect } from 'react-redux';
import SelectedMainPart from './selected-main-part.jsx';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

class MainMainPart extends React.Component {
    constructor(props) {
        super(props);

        this._value = '';
        this._onChangeEditor = this._onChangeEditor.bind(this);
        this._sendCode = this._sendCode.bind(this);
    }

    _sendCode() {
        console.log(this._value)
        this.props.serverFetch.algoCodeFetch({
            code: this._value,
        });
        // location.reload(); /// fuck
    }

    _onChangeEditor(val) {

        this._value = val;
    }

    render() {
        let code = '';
        let header = ((props) => {
            this.props.myAlgs.forEach((alg) => {
                if (alg.isAlgSelected) {
                    console.log(alg);
                    code = alg.code;
                    console.log(code);
                }
            });
            return null;
        })(this.props);

        this._value = code;

        console.log(this.props);
        let codeEditor = null;
        if (this.props.isAlgSelected) {
            codeEditor = (
                <div className="menu-part">
                    <AceEditor
                        placeholder="code"
                        mode="java"
                        theme="monokai"
                        name="blah2"
                        onLoad={this.onLoad}
                        onChange={this._onChangeEditor}
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
                        }}
                    />
                    <SelectedMainPart start={this._sendCode} />
                </div>
            );
        } else {
            codeEditor = (<div className="menu-part"><div className="choose">Выберите алгоритм</div></div>) ;
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
        myAlgs: state.myAlgs,
        isAlgSelected: state.isAlgSelected,
    }
};

export default connect(mapStateToProps)(MainMainPart);