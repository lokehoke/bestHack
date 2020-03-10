import React from 'react';

class Reg extends React.Component {
    constructor(props){
        super(props);
    };


    render() {
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

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Повторите пароль:</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"></input>
                    </div>
                    
                    <button type="submit" className="auth-btn btn btn-primary">Зарегистрироваться</button>

                </form>

            </div>
        );
    };
};

export default Reg;