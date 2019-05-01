import React from "react";
import Page from "./pages/Page";
import BootStrap from "./pages/BootStrap";
import GestionType from "./pages/GestionType";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GestionProbleme from "./pages/GestionProbleme";

function Nav() {
    return (

        <Router>
                <Route exact path="/" component={Page} />

                <Route path="/BootStrap" component={BootStrap} />

                <Route path="/GestionType" component={GestionType} />

                <Route path="/GestionProbleme" component={GestionProbleme} />
        </Router>
    );
}

export default Nav;

