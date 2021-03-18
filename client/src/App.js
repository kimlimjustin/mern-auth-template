import React from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "./Components/auth";
import Home from "./Components/home";

const App = () => (
    <Router>
        <Switch>
            <Route exact path = "/" component = {Home} />
            <Route path = "/auth" component = {Auth} />
        </Switch>
    </Router>
)

export default App;