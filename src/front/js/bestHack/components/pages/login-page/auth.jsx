'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { setPath } from '../../../actions/actions.js';

class Auth extends React.Component {
    constructor(props){
        super(props);
    };


    render() {

        let error = null;
        if (this.props.authError === 'true') {
            error = (
                <div className="error">заебешь</div>
            );
        };
        

        return(
            <div className="auth">

                <form className="auth-form">

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Логин:</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Пароль:</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"></input>
                    </div>
                    
                    <button type="submit" className="auth-btn btn btn-primary">Войти</button>
                    {error}
                    <div className="reg-link" onClick={this.props.setPath}>или зарегистрируйтесь</div>
                </form>

            </div>
        );
    };
};


const mapStateToProps = state => {
    return {
        authError: state.authError
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setPath: () => dispatch(setPath('/register'))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);