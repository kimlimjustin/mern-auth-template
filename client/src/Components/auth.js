import React from "react";

const Auth = () => {
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
                                <form action="#" method="POST">
                                    <div className="form-group form-animate">
                                        <label htmlFor="login-username" className="form-label">Username</label>
                                        <input type="text" className="input-animate" id="login-username" required autoComplete="username" />
                                    </div>
                                    <div className="form-group form-animate">
                                        <label htmlFor="login-password" className="form-label">Password</label>
                                        <input type="password" className="input-animate" id="login-password" required autoComplete="current-password" />
                                    </div>
                                    <div className="form-group">
                                    <button className="btn github-login-btn btn-shadow">
                                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                            <span>Login with GitHub</span>
                                        </button>
                                        <button className="btn form-control theme-adjust">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div id="register" className="tab-content">
                                <form action="#" method="POST">
                                    <div className="form-group form-animate">
                                        <label htmlFor="reg-username" className="form-label">Username</label>
                                        <input type="text" className="input-animate" id="reg-username" required autoComplete="username" />
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group form-animate">
                                                <label htmlFor="reg-password" className="form-label">Password</label>
                                                <input type="password" className="input-animate" id="reg-password" required autoComplete="new-password" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group form-animate">
                                                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                                <input type="password" className="input-animate" id="confirm-password" required autoComplete="new-password" />
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