import React from "react";
import Page from "./Pages/Page";
import BootStrap from "./Pages/BootStrap";
import GestionType from "./Pages/GestionType";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Nav() {
    return (

        <Router>
                <Route exact path="/" component={Page} />

                <Route path="/BootStrap" component={BootStrap} />

                <Route path="/GestionType" component={GestionType} />
        </Router>
    );
}

export default Nav;

