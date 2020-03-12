'use strict';
import React from 'react';

import { connect } from 'react-redux';
import { setPath } from '../../../actions/actions.js';

class Reg extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            isError: false,
            kindError: '',
        };
        this._clickEnter = this._clickEnter.bind(this);

    }

    _validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    _clickEnter(e) {
        e.preventDefault();

        let email  = document.querySelector('#registEmailID');
        let pass = document.querySelector('#registPassID');
        let repass = document.querySelector('#registRePassId');

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
        } else if (pass.value !== repass.value) {
            this.setState({
                isError: true,
                kindError: 'passNotEqual',
            });
        } else {
            this.setState({
                isError: false,
                kindError: '',
            });

            this.props.serverFetch.registerFetch({
                email: email.value,
                password: pass.value
            }, res => {
                console.log(res);
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
                case 'passNotEqual': error = (<div className="error">Введенные пароли не совпадают.</div>); break;
            }
        };

        return(
            <div className="auth">
                <form className="auth-form">
                    <div className="form-group">
                        <label htmlFor="registEmailID">Логин:</label>
                        <input type="text" className="form-control" id="registEmailID" aria-describedby="emailHelp"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="registPassID">Пароль:</label>
                        <input type="password" className="form-control" id="registPassID"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="registRePassId">Повторите пароль:</label>
                        <input type="password" className="form-control" id="registRePassId"></input>
                    </div>
                    
                    <button className="auth-btn btn btn-primary" onClick={this._clickEnter}>Зарегистрироваться</button>

                    {error}

                    <div className="back-to-auth"><div >Есть аккаунт?</div> <div className="exit" onClick={this.props.setPath}>Вход</div></div>
                </form>

            </div>
        );
    };
};


const mapDispatchToProps = dispatch => {
    return {
        setPath: () => {dispatch(setPath('/auth'))}
    }
};


export default connect(null, mapDispatchToProps)(Reg);