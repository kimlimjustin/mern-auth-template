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