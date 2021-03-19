import React, { useEffect, useState } from "react";
import axios from "axios";

const parseQueryVariable = (variable, search) => {
    var query = search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null
}

const Auth = ({location}) => {
    const [inputLoginUsername, setInputLoginUsername] = useState('');
    const [inputLoginPassword, setInputLoginPassword] = useState('');
    const [inputRegisterEmail, setInputRegisterEmail] = useState('');
    const [inputRegisterUsername, setInputRegisterUsername] = useState('');
    const [inputRegisterPassword, setInputRegisterPassword] = useState('');
    const [inputRegisterPasswordConfirmation, setInputRegisterPasswordConfirmation] = useState('');

    useEffect(() => {
        if(location.search){
            const code = parseQueryVariable('code',location.search)
            if(code){
                console.log(code)
            }
        }
    }, [location.search])

    const Login = e => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {username: inputLoginUsername, password: inputLoginPassword})
        .then(response => console.log(response))
    }

    const Register = e => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {username: inputRegisterUsername, email: inputRegisterEmail, password: inputRegisterPassword})
        .then(response => console.log(response))
    }

    return(
        <div className="container">
            <div className="centeredForm">
                <div className="box theme-reverse">
                    <div className="box">
                        <div className="tab" data-tab="formTab">
                            <button className="tab-btn btn-dark" data-content="login">Login</button>
                            <button className="tab-btn btn-light" data-content="register">Register</button>
                        </div>
                        <div className="tab-contents" id="formTab">
                            <div id="login" className="tab-content tab-content-active">
                                <form onSubmit={Login} method="POST">
                                    <div className="form-group form-animate">
                                        <label htmlFor="login-username" className="form-label">Username</label>
                                        <input type="text" className="input-animate" required autoComplete="username" value={inputLoginUsername} onChange = {({target: {value}}) => setInputLoginUsername(value)} />
                                    </div>
                                    <div className="form-group form-animate">
                                        <label htmlFor="login-password" className="form-label">Password</label>
                                        <input type="password" className="input-animate" required autoComplete="current-password" value = {inputLoginPassword} onChange = {({target: {value}}) => setInputLoginPassword(value)} />
                                    </div>
                                    <div className="form-group">
                                        <a className="btn github-login-btn btn-shadow theme-adjust" href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                            <span>Login with GitHub</span>
                                        </a>
                                        <button className="btn form-control theme-adjust">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div id="register" className="tab-content">
                                <form onSubmit={Register} method="POST">
                                    <div className="form-group form-animate">
                                        <label htmlFor="reg-username" className="form-label">Username</label>
                                        <input type="text" className="input-animate" required autoComplete="username" value = {inputRegisterUsername} onChange = {({target: {value}}) => setInputRegisterUsername(value)}/>
                                    </div>
                                    <div className="form-group form-animate">
                                        <label htmlFor="reg-username" className="form-label">Email</label>
                                        <input type="text" className="input-animate" required autoComplete="username" value = {inputRegisterEmail} onChange = {({target: {value}}) => setInputRegisterEmail(value)}/>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group form-animate">
                                                <label htmlFor="reg-password" className="form-label">Password</label>
                                                <input type="password" className="input-animate" required autoComplete="new-password" value = {inputRegisterPassword} onChange = {({target: {value}}) => setInputRegisterPassword(value)} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group form-animate">
                                                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                                <input type="password" className="input-animate" required autoComplete="new-password" value = {inputRegisterPasswordConfirmation} onChange = {({target: {value}}) => setInputRegisterPasswordConfirmation(value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn github-login-btn btn-shadow">
                                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                            <span>Login with GitHub</span>
                                        </button>
                                        <button className="btn form-control theme-adjust">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;