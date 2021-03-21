import React, {useEffect, useState} from "react";
import axios from "axios";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "./Components/auth";
import Home from "./Components/home";

const App = () => {
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/profile`,{withCredentials: true})
        .then(response => {
            if(!response.data.unauthorized) setUserInfo(response)
            else setUserInfo(false)
        })
    }, [])
    return(
        <Router>
            <Switch>
                <Route exact path = "/" component = {(props) => <Home {...props} userInfo = {userInfo} />} />
                <Route path = "/auth" component = {(props) => <Auth {...props} userInfo={userInfo} />} />
            </Switch>
        </Router>
    )
}

export default App;