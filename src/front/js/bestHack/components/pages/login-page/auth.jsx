'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { setPath } from '../../../actions/actions.js';

class Auth extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            isError: false,
            kindError: '',
        };
        this._clickEnter = this._clickEnter.bind(this);
    };

    _validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    _clickEnter(e) {
        e.preventDefault();

        let email  = document.querySelector('#authEmailID');
        let pass   = document.querySelector('#authPassID');

        if (email.value === '') {
            this.setState({
                isError: true,
                kindError: 'emailEmpty',
            });
        } else if (!this._validateEmail(email.value)) {
            this.setState({
                isError: true,
                kindError: 'notValidEmail',
            });
        } else if (pass.value == '') {
            this.setState({
                isError: true,
                kindError: 'passEmpty',
            });
        } else {
            this.setState({
                isError: false,
                kindError: '',
            });

            this.props.serverFetch.authFetch({
                email: email.value,
                password: pass.value
            }, res => {
                console.log(res);
                this.props.serverFetch.getUserInfoFetch(this.props.setPath('/main'));
            }, res => {
                console.log(res);
            });
        }

        return false;
    }



    render() {
        let error = null;
        if (this.state.isError) {
            switch (this.state.kindError) {
                case 'emailEmpty': error = (<div className="error">Вы не ввели email.</div>); break;
                case 'notValidEmail': error = (<div className="error">Невалидный email.</div>); break;
                case 'passEmpty': error = (<div className="error">Вы не ввели пароль.</div>); break;
            }
        };
        

        return(
            <div className="auth">
                <form className="auth-form">

                    <div className="form-group">
                        <label htmlFor="authEmailID">Логин:</label>
                        <input type="text" className="form-control" id="authEmailID" aria-describedby="emailHelp"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="authPassID">Пароль:</label>
                        <input type="password" className="form-control" id="authPassID"></input>
                    </div>
                    
                    <button className="auth-btn btn btn-primary" onClick={this._clickEnter}>Войти</button>
                    {error}
                    <div className="reg-link" onClick={this.props.setPath('/register')}>или зарегистрируйтесь</div>
                </form>

            </div>
        );
    };
};


const mapDispatchToProps = dispatch => {
    return {
        setPath: path => {
            return () => {
                dispatch(setPath(path))
            }
        }
    };
};


export default connect(null, mapDispatchToProps)(Auth);